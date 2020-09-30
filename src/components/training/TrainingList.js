import React, { useState, useContext, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { TrainingContext } from "./TrainingProvider"
import { Training } from "./Training"
import { TrainingGoalContext } from "../trainingGoals/TrainingGoalProvider"
import "./Training.css"

import { TrainingTypeContext } from "../trainingType/TrainingTypeProvider"

export const TrainingList = (props) => {
  //refs
  const goalSet = useRef(null)

  //useContext
  const { getTrainings, trainings, removeTraining } = useContext(TrainingContext)
  const { trainingTypes, getTrainingTypes } = useContext(TrainingTypeContext)
  const { getPlayerByPlayerId } = useContext(PlayerContext)
  const { getTrainingGoals, getPlayerTrainingGoals, editTrainingGoal,  trainingGoals } = useContext(TrainingGoalContext)

  //useState
  const [playerTrainings, setFiltered] = useState([])
  const [player, setPlayer] = useState({})
  const [playerTrainingGoal, setPlayerTrainingGoal] = useState([])
  const [editMode, setEditMode] = useState(false)

  //define ids
  const playerId = parseInt(props.match.params.playerId)
  const userId = parseInt(sessionStorage.getItem("wr__user"))
  const thisWeek = props.trainingsThisWeek.length
  //useEffect
    useEffect(() => {
        getPlayerByPlayerId(playerId)
          .then(setPlayer)
    }, [])

    useEffect(()=>{
      getTrainingGoals()
    }, [])

    useEffect(()=>{
      const playerTrainingGoal = trainingGoals.filter(tg => tg.playerId === props.playerId) || []
      const goal = playerTrainingGoal[0] || {}
    setPlayerTrainingGoal(playerTrainingGoal[0])
    }, [trainingGoals])
    useEffect(() => {
      getTrainingTypes()
      .then(getTrainings)
  }, [])

  useEffect(()=>{
    const playerTrainingGoal = trainingGoals.filter(eg => eg.playerId === playerId) || []
    const goal = playerTrainingGoal[0] || {}
    setPlayerTrainingGoal(goal)
  }, [trainingGoals])

    useEffect(() => {
      const matchingTrainings = trainings.filter(training => training.playerId === playerId)
      const orderedTrainings = matchingTrainings.reverse()
      setFiltered(orderedTrainings)
  }, [trainings])

  const toggleEditMode = () => {
    if (editMode === true) {
      setEditMode(false)
    }
    else {
      setEditMode(true)
    }
  }

  const handleControlledInputChange = (e) => {
    const newPlayerTrainingGoal = Object.assign({}, playerTrainingGoal)
    newPlayerTrainingGoal[e.target.name] = e.target.value
    setPlayerTrainingGoal(newPlayerTrainingGoal)
  }

  const constructNewTrainingGoal = () => {
    //define player ID

    {editTrainingGoal({
      id: props.playerTrainingGoal.id,
      playerId: playerId,
      goalSet: playerTrainingGoal.goalSet,
      timestamp:Date.now(),
      date: props.todayObj,
    })
    .then(() => props.history.push(`/players/${playerId}`))}
  }

  //evaluates logged exercises and user:player relationship - displays data accordingly
  const trainingListVerify = () => {
    if(playerTrainings.length < 1 && userId === props.player.userId) {
    return (
      <>
        <div className="cont__list cont__list--tr">
          <h2 className="list__header list__header--tr">
            Training
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
                constructNewTrainingGoal()
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
              {playerTrainingGoal.goalSet}
              </div>
            </>
          }
          <button className="btn btn--add-tr" onClick={
            () => props.history.push(`/players/training/add/${playerId}`)
          }>
            Add Training
          </button>
          <article className="list list--tr">
          <h1 className="h1 no-data-msg no-tr-msg">
              Woof!
            </h1>
            <h3 className="h5 no-data-msg no-tr-msg">
                {props.player.name} doesn't have any training sessions, yet!
            </h3>
          </article>
        </div>
      </>
    )
    }
    if(playerTrainings.length < 1 && userId !==props.player.userId) {
      return (
        <>
          <div className="cont__list cont__list--tr">
          <h2 className="list__header list__header--tr">
            Training
          </h2>
          <article className="list list--tr">
          <h1 className="h1 no-data-msg no-tr-msg">
              Woof!
            </h1>
            <h3 className="h5 no-data-msg no-tr-msg">
                {player.name} doesn't have any training sessions, yet!
            </h3>
          </article>
        </div>
        </>
      )
    }
    if ( userId !==props.player.userId ) {
      return (
        <>
          <div className="cont__list cont__list--tr">
            <h2 className="list__header list__header--tr">
              Training
            </h2>
            <article className="list list--tr">
              {playerTrainings.map(tr => {
                const trainingType = trainingTypes.find(tt => tt.id === tr.trainingTypeId) || {}

                return <Training {...props}
                key={tr.id}
                training={tr}
                trainingType={trainingType}
                removeTraining={removeTraining}
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
          <div className="cont__list cont__list--tr">
            <h2 className="list__header list__header--tr">
              Training
            </h2>
            {editMode
            ?
            <>
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
                constructNewTrainingGoal()
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
            {playerTrainingGoal.goalSet} per week.
            </div>

            <div className="exercise-acheived">
            Acheived:
            <br />
            {thisWeek}
            </div>
            </>
            }
            <button className="btn btn--add-tr" onClick={
            () => props.history.push(`/players/training/add/${playerId}`)
            }>
              Add Training
            </button>
            <article className="list list--tr">
              {playerTrainings.map(tr => {
                const trainingType = trainingTypes.find(tt => tt.id === tr.trainingTypeId) || {}

                return <Training {...props}
                key={tr.id}
                training={tr}
                trainingType={trainingType}
                removeTraining={removeTraining}
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
      {trainingListVerify()}
    </>
  )
}

