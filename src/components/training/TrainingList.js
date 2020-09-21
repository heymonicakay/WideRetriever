import React, { useState, useContext, useEffect } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { TrainingContext } from "./TrainingProvider"
import { Training } from "./Training"
import "./Training.css"

import { TrainingTypeContext } from "../trainingType/TrainingTypeProvider"

export const TrainingList = (props) => {
  //useContext
  const { getTrainings, trainings } = useContext(TrainingContext)
  const { trainingTypes, getTrainingTypes } = useContext(TrainingTypeContext)
  const { getPlayerById } = useContext(PlayerContext)

  //useState
  const [filteredTrainings, setFiltered] = useState([])
  const [player, setPlayer] = useState({})

  //define playerId
  const playerId = parseInt(props.match.params.playerId)
    useEffect(() => {
      const playerId = parseInt(props.match.params.playerId)
        getPlayerById(playerId)
          .then(setPlayer)
    }, [])
    useEffect(() => {
      getTrainingTypes()
      .then(getTrainings)
  }, [])

    useEffect(() => {
      const matchingTrainings = trainings.filter(training => training.playerId === playerId)
      const orderedTrainings = matchingTrainings.reverse()
      setFiltered(orderedTrainings)
  }, [trainings])

  const trainingListVerify = () => {
    if(filteredTrainings.length < 1 ) {
    return (
      <>
        <div className="cont__list cont__list--tr">

          <h2 className="list__header list__header--tr">
            Training
          </h2>
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
    else {
      return (
        <>
          <div className="cont__list cont__list--tr">

            <h2 className="list__header list__header--tr">
              Training
            </h2>
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

