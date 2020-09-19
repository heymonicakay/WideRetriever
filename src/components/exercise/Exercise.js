import React, { useContext, useState } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import "./Exercise.css"

export const Exercise = ( props ) => {
  const { removeExercise } = useContext(ExerciseContext)

  return (
  <section className="ex-card">
    <button className="btn btn--circle btn--red btn--del" onClick={() => {
            removeExercise(props.exercise.id)}}>
      X
    </button>
    <div className="ex-card--details">
      <span className="ex-card--detail ex-card--date">
        {props.exercise.date}
      </span>
      <div className="ex-card--stats">
        <span className="ex-card--detail ex-card--catches">
          {props.exercise.duration}
        </span>
        <span className="ex-card--detail ex-card--misses">
          {props.exerciseType.type}
        </span>
      </div>
      <div className="ex-card--detail ex-card--note">
          {props.exercise.note}
      </div>
    </div>
  </section>
  )
}