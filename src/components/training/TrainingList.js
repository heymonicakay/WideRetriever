import React, { useState, useContext, useEffect } from "react"
import { TrainingContext } from "./TrainingProvider"
import { Training } from "./Training"
import "./Training.css"

import { TrainingTypeContext } from "../trainingType/TrainingTypeProvider"

export const TrainingList = (props) => {
    const { getTrainings, trainings } = useContext(TrainingContext)

    const [filteredTrainings, setFiltered] = useState([])

    const { trainingTypes, getTrainingTypes } = useContext(TrainingTypeContext)

    const playerId = parseInt(props.match.params.playerId)

    useEffect(() => {
      getTrainingTypes()
      .then(getTrainings)
  }, [])

    useEffect(() => {
      const matchingTrainings = trainings.filter(training => training.playerId === playerId)
      setFiltered(matchingTrainings)
  }, [trainings])


    return (
      <>
        <div className="cont__list cont__list--tr">

          <h2 className="list__header list__header--tr">
            Training
          </h2>
          <button className="btn btn--add-tr">
            Add Training
          </button>
          <article className="list list--tr">

            {filteredTrainings.map(tr => {

              const trainingType = trainingTypes.find(tt => tt.id === tr.trainingTypeId)

              return <Training
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

