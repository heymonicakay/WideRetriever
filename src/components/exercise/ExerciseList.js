import React, { useState, useContext, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { ExerciseContext } from "./ExerciseProvider"
import { Exercise } from "./Exercise"
import { ExerciseGoalContext } from "../exerciseGoals/ExerciseGoalProvider"

import "./Exercise.css"

import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"

export const ExerciseList = (props) => {
  //refs
  const goalSet = useRef(null)

  // useContext
    const { getExercises, exercises, removeExercise } = useContext(ExerciseContext)
    const { exerciseTypes, getExerciseTypes } = useContext(ExerciseTypeContext)
    const { getPlayerById } = useContext(PlayerContext)

    const { getExerciseGoals, exerciseGoals, editExerciseGoal } = useContext(ExerciseGoalContext)

  // useState
    const [filteredExercises, setFiltered] = useState([])
    const [player, setPlayer] = useState({})
    const [playerExerciseGoal, setPlayerExerciseGoal] = useState([])
    const [editMode, setEditMode] = useState(false)

  //define ids
  const playerId = parseInt(props.match.params.playerId)
  const userId = parseInt(sessionStorage.getItem("wr__user"))
  const thisWeek = props.exercisesThisWeek.length

    //useEffect
    useEffect(() => {
      getExerciseTypes()
      .then(getExercises)
  }, [])

  useEffect(() => {
    getPlayerById(playerId)
      .then(setPlayer)
}, [])

useEffect(()=>{
  getExerciseGoals()
}, [])

useEffect(()=>{
  const playerExerciseGoal = exerciseGoals.filter(eg => eg.playerId === playerId) || []
  const goal = playerExerciseGoal[0] || {}
  setPlayerExerciseGoal(goal)
}, [exerciseGoals])

useEffect(() => {
  const matchingExercises = exercises.filter(exercise => exercise.playerId === playerId)
  const orderedExercises = matchingExercises.reverse()
  setFiltered(orderedExercises)
}, [exercises])

    const toggleEditMode = ()=>{
      if(editMode === false) {
        setEditMode(true)
      }
      else {
        setEditMode(false)
      }
    }

    const handleControlledInputChange = (e) => {
      const newPlayerExerciseGoal = Object.assign({}, playerExerciseGoal)
      newPlayerExerciseGoal[e.target.name] = e.target.value
      setPlayerExerciseGoal(newPlayerExerciseGoal)
    }
    const todayTimestamp = Date.now()
    const today = new Date(todayTimestamp).toLocaleDateString('en-US')

    const constructNewExerciseGoal = () => {
      //define player ID

      {editExerciseGoal({
        id: props.playerExerciseGoal.id,
        playerId: playerId,
        goalSet: playerExerciseGoal.goalSet,
        timestamp:Date.now(),
        date: today,
      })
      .then(() => props.history.push(`/players/${playerId}`))}
    }

    //define vars

    console.log(player, "in ex list")

  //evaluates logged exercises and user:player relationship - displays data accordingly
  const exerciseListVerify = () => {
    if(filteredExercises.length < 1 && userId === player.userId) {
      return (
      <>
        <div className="cont__list cont__list--ex">
          <h2 className="list__header list__header--ex">
            Exercise
          </h2>
          {editMode
          ?<>
          <select defaultValue="" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange}>
                <option value="0">0</option>
                <option value="1">1 day a week</option>
                <option value="2">2 days a week</option>
                <option value="3">3 days a week</option>
                <option value="4">4 days a week</option>
                <option value="5">5 days a week</option>
                <option value="6">6 days a week</option>
                <option value="7">7 days a week</option>
              </select>

              <button className="btn btn--submit btn--ex" type="button"
              onClick={e => {
                e.preventDefault()
                constructNewExerciseGoal()
                toggleEditMode()
              }}>
              Update Goal!
              </button>
          </>
          :<>
          <div className="exercise-goals" onClick={toggleEditMode}>
            Goal:
            <br />
            {playerExerciseGoal.goalSet}
          </div>
          </>
          }

          <button className="btn btn--add-ex" onClick={
            () => props.history.push(`/players/exercise/add/${playerId}`)
            }>
              Add Exercise
          </button>
          <article className="list list--ex">
            <h1 className="h1 no-data-msg no-ex-msg">
              Woof!
            </h1>
            <h3 className="h5 no-data-msg no-ex-msg">
                {player.name} doesn't have any exercise sessions, yet!
            </h3>
          </article>
        </div>
      </>
    )
    }
    if(filteredExercises.length < 1 && userId !== player.userId) {
      return (
      <>
        <div className="cont__list cont__list--ex">
          <h2 className="list__header list__header--ex">
            Exercise
          </h2>
          <article className="list list--ex">
            <h1 className="h1 no-data-msg no-ex-msg">
              Woof!
            </h1>
            <h3 className="h5 no-data-msg no-ex-msg">
                {player.name} doesn't have any exercise sessions, yet!
            </h3>
          </article>
        </div>
      </>
    )
    }
    if ( userId !== player.userId ) {
      return (
        <>
        <div className="cont__list cont__list--ex">
          <h2 className="list__header list__header--ex">
            Exercise
          </h2>
            <article className="list list--ex">
              {filteredExercises.map(ex => {
              const exerciseType = exerciseTypes.find(et => et.id === ex.exerciseTypeId) || {}
              return <Exercise {...props}
                  key={ex.id}
                  exercise={ex}
                  exerciseType={exerciseType}
                  removeExercise={removeExercise}
                />
              })
            }
            </article>
          </div>
        </>
      )
    }
    else {
      return (
        <>
          <div className="cont__list cont__list--ex">

            <h2 className="list__header list__header--ex">
              Exercise
            </h2>
            {editMode
              ? <>
              <select defaultValue="" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange}>
          <option value="0">0</option>
          <option value="1">1 day a week</option>
          <option value="2">2 days a week</option>
          <option value="3">3 days a week</option>
          <option value="4">4 days a week</option>
          <option value="5">5 days a week</option>
          <option value="6">6 days a week</option>
          <option value="7">7 days a week</option>
        </select>
        <button className="btn btn--submit btn--ex" type="button"
              onClick={e => {
                e.preventDefault()
                constructNewExerciseGoal()
                toggleEditMode()
              }}>
              Update Goal!
              </button>
              </>
              :
              <>
              <div className="exercise-goals" onClick={toggleEditMode}>
            Goal:
            <br />
            {playerExerciseGoal.goalSet} per week.
            </div>
              </>
            }

            <button className="btn btn--add-ex" onClick={
              () => props.history.push(`/players/exercise/add/${playerId}`)
            }>
              Add Exercise
            </button>
              <article className="list list--ex">
                {filteredExercises.map(ex => {

                const exerciseType = exerciseTypes.find(et => et.id === ex.exerciseTypeId) || {}

                return <Exercise {...props}
                    key={ex.id}
                    exercise={ex}
                    exerciseType={exerciseType}
                    removeExercise={removeExercise}
                  />
                })
              }
              </article>
          </div>
        </>
      )
    }
  }
  return (
    <>
    {exerciseListVerify()}
    </>
  )
}

