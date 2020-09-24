import React, { useState, useContext, useEffect } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { TrainingContext } from "./TrainingProvider"
import { Training } from "./Training"
import { TrainingGoalContext } from "../trainingGoals/TrainingGoalProvider"
import "./Training.css"

import { TrainingTypeContext } from "../trainingType/TrainingTypeProvider"

export const TrainingList = (props) => {
  //useContext
  const { getTrainings, trainings, removeTraining } = useContext(TrainingContext)
  const { trainingTypes, getTrainingTypes } = useContext(TrainingTypeContext)
  const { getPlayerById } = useContext(PlayerContext)
  const { getTrainingGoals, trainingGoals } = useContext(TrainingGoalContext)

  //useState
  const [filteredTrainings, setFiltered] = useState([])
  const [player, setPlayer] = useState({})
  const [playerGoals, setPlayerGoals] = useState([])
  const [ goal, setGoal ] = useState({})
  const [isLoading, setIsLoading] = useState(null)

  //define ids
  const playerId = parseInt(props.match.params.playerId)
  const userId = parseInt(sessionStorage.getItem("wr__user"))

  //useEffect
    useEffect(() => {
        getPlayerById(playerId)
          .then(setPlayer)
    }, [])

    useEffect(()=>{
      getTrainingGoals()
    }, [])

    useEffect(() => {
      getTrainingTypes()
      .then(getTrainings)
  }, [])

  useEffect(()=>{
    const playerGoals = trainingGoals.filter(eg => eg.playerId === playerId) || []
    const goal = playerGoals[0] || {}
    setPlayerGoals(playerGoals[0])
    setGoal(goal)
  }, [trainingGoals])

    useEffect(() => {
      const matchingTrainings = trainings.filter(training => training.playerId === playerId)
      const orderedTrainings = matchingTrainings.reverse()
      setFiltered(orderedTrainings)
  }, [trainings])

  //evaluates logged exercises and user:player relationship - displays data accordingly
  const trainingListVerify = () => {
    if(filteredTrainings.length < 1 && userId === player.userId) {
    return (
      <>
        <div className="cont__list cont__list--tr">
          <h2 className="list__header list__header--tr">
            Training
          </h2>
          <div className="exercise-goals">
            Goal:
            <br />
            {goal.goalSet} per week.
          </div>
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
                {player.name} doesn't have any training sessions, yet!
            </h3>
          </article>
        </div>
      </>
    )
    }
    if(filteredTrainings.length < 1 && userId !== player.userId) {
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
    if ( userId !== player.userId ) {
      return (
        <>
          <div className="cont__list cont__list--tr">
            <h2 className="list__header list__header--tr">
              Training
            </h2>
            <article className="list list--tr">
              {filteredTrainings.map(tr => {
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
            <div className="exercise-goals">
            Goal:
            <br />
            {goal.goalSet} per week.
            </div>
            <button className="btn btn--add-tr" onClick={
            () => props.history.push(`/players/training/add/${playerId}`)
            }>
              Add Training
            </button>
            <article className="list list--tr">
              {filteredTrainings.map(tr => {
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

