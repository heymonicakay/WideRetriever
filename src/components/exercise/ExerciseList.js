import React, { useState, useContext, useEffect } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { ExerciseContext } from "./ExerciseProvider"
import { Exercise } from "./Exercise"
import "./Exercise.css"

import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"

export const ExerciseList = (props) => {
  // useContext
    const { getExercises, exercises, removeExercise } = useContext(ExerciseContext)
    const { exerciseTypes, getExerciseTypes } = useContext(ExerciseTypeContext)
    const { getPlayerById } = useContext(PlayerContext)

  // useState
    const [filteredExercises, setFiltered] = useState([])
    const [player, setPlayer] = useState({})

    //define Player Id
    const playerId = parseInt(props.match.params.playerId)

    //define user id
    const userId = parseInt(sessionStorage.getItem("wr__user"))

    //useEffect
  useEffect(() => {
    const playerId = parseInt(props.match.params.playerId)
      getPlayerById(playerId)
        .then(setPlayer)
  }, [])
    useEffect(() => {
      getExerciseTypes()
      .then(getExercises)
  }, [])
    useEffect(() => {
      const matchingExercises = exercises.filter(exercise => exercise.playerId === playerId)
      const orderedExercises = matchingExercises.reverse()
      setFiltered(orderedExercises)
  }, [exercises])
  
  //evaluates logged exercises and user:player relationship - displays data accordingly
  const exerciseListVerify = () => {
    if(filteredExercises.length < 1 && userId === player.userId) {
      return (
      <>
        <div className="cont__list cont__list--ex">
          <h2 className="list__header list__header--ex">
            Exercise
          </h2>
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

