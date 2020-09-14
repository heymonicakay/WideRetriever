import React, { useState, useContext, useEffect } from "react"
import { TrainingContext } from "./TrainingProvider"
import { Training } from "./Training"
import "./Training.css"

export const TrainingList = (props) => {
    const { getTrainings, trainings } = useContext(TrainingContext)

    const [filteredTrainings, setFiltered] = useState([])

    const playerId = parseInt(props.match.params.playerId)

    useEffect(() => {
      getTrainings()
  }, [])

    useEffect(() => {
      const matchingTrainings = trainings.filter(training => training.playerId === playerId)
      setFiltered(matchingTrainings)
  }, [])

  useEffect(() => {
    setFiltered(trainings)
  }, [trainings])

    return (
      <>
      <div className="cont__list cont__list--pt">

        <h2 className="list__header list__header--pt">
          Training
        </h2>
        <button className="btn btn--add-pt">
          Add Training
        </button>
        <article className="list list--pt">

          {filteredTrainings.map(tr => {

            return <Training
            key={tr.id}
            training={tr}
            />
          })
        }
        </article>
        </div>
      </>
    )
}

