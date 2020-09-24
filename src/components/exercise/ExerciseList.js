import React, { useState, useContext, useEffect } from "react"
// import { PlayerContext } from "../players/PlayerProvider"
import { ExerciseContext } from "./ExerciseProvider"
import { Exercise } from "./Exercise"
// import { ExerciseGoalContext } from "../exerciseGoals/ExerciseGoalProvider"

import "./Exercise.css"

import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"

export const ExerciseList = (props) => {
  // useContext
    const { removeExercise } = useContext(ExerciseContext)
    const { exerciseTypes, getExerciseTypes } = useContext(ExerciseTypeContext)
    // const { getExerciseGoals, exerciseGoals } = useContext(ExerciseGoalContext)

  // useState
    const [filteredExercises, setFiltered] = useState([])
    const [isLoading, setIsLoading] = useState(null)
    const [editMode, setEditMode] = useState(false)


    //useEffect
    useEffect(() => {
      getExerciseTypes()
  }, [])

    const toggleEdit = ()=>{
      if(editMode === false) {
        setEditMode(true)
      }
      else {
        setEditMode(false)
      }
    }

    //define vars
    const playerId = props.player.id
    const player = props.player
    const userId = parseInt(sessionStorage.getItem("wr__user"))
    const playerExercises = props.playerExercises.reverse()
    const playerExerciseGoal = props.playerExerciseGoal

    console.log(playerExerciseGoal, "in ex list")

  //evaluates logged exercises and user:player relationship - displays data accordingly
  const exerciseListVerify = () => {
    if(playerExercises.length < 1 && userId === player.userId) {
      return (
      <>
        <div className="cont__list cont__list--ex">
          <h2 className="list__header list__header--ex">
            Exercise
          </h2>
          <div className="exercise-goals" onClick={toggleEdit}>
            Weekly Goal:
            <br />
          </div>
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
    if(playerExercises.length < 1 && userId !== player.userId) {
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
            <div className="exercise-goals">
            Goal:
            <br />
            {/* {goal.goalSet} per week. */}
            </div>
            <button className="btn btn--add-ex" onClick={
              () => props.history.push(`/players/exercise/add/${playerId}`)
            }>
              Add Exercise
            </button>
              <article className="list list--ex">
                {playerExercises.map(ex => {

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

