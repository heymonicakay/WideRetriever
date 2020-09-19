import React, { useContext, useState, useRef } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import "./Exercise.css"

export const Exercise = ( props ) => {
  const { removeExercise, updateExercise } = useContext(ExerciseContext)

  const [noteHidden, setNoteHidden] = useState(true)
  const [editMode, setEditMode] = useState(false)

  const toggleHidden = () => {
    if (noteHidden === true) {
      setNoteHidden(false)
    } else {
      setNoteHidden(true)
    }
}

  const toggleEditMode = () => {
    if (editMode ===true) {
      setEditMode(false)
    }
    else {
      setEditMode(true)
    }
  }

  return (
    <>
    {editMode
      ?
        <>
          <button onClick={()=>{
            toggleEditMode()
          }}>
            Save Changes
          </button>
        </>
      :
          <section className="ex-card">
            <div className="ex-card--details" onClick={()=>{
              toggleHidden()
            }}>
              <span className="ex-card--detail ex-card--date">
                {props.exercise.date}
              </span>
              <div className="ex-card--stats">
                <div className="ex-card--detail ex-card--catches">
                  {props.exercise.duration}
                </div>
                <span className="ex-card--detail ex-card--misses">
                  {props.exerciseType.type}
                </span>
              </div>
              <div className="ex-card--detail ex-card--note">
                  {noteHidden
                    ? <span hidden></span>
                    : <>
                        <span className="note">
                          {props.exercise.note}
                        </span>
                        <span className="edit" onClick={()=>
                        toggleEditMode()}>
                          Edit
                        </span>
                        <button className="btn btn--circle btn--red btn--del" onClick={() => {
                            removeExercise(props.exercise.id)}}>
                          X
                        </button>
                      </>
                  }
              </div>
            </div>
          </section>
    }
    </>
  )
}