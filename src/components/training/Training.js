import React, { useContext } from "react"
import { TrainingContext } from "./TrainingProvider"
import "./Training.css"

export const Training = ( props ) => {
  const { removeTraining } = useContext(TrainingContext)

  return (
  <section className="tr-card">
    <button className="btn btn--del btn--red btn--circle" onClick={() => {
            removeTraining(props.training.id)}}>
      X
    </button>
    <div className="tr-card--details">
      <span className="tr-card--detail tr-card--date">
        {props.training.date}
      </span>
      <div className="tr-card--stats">
        <span className="tr-card--detail tr-card--duration">
          {props.training.duration}
        </span>
        <span className="tr-card--detail tr-card--type">
          {props.trainingType.type}
        </span>
      </div>
    </div>
  </section>
  )
}