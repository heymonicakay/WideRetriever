import React, { useContext, useState, useEffect, useRef } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"
import { PlayerContext } from "../players/PlayerProvider"
import "./Exercise.css"

// goalset = x many
// measurement type = minute, hour, times
//frequency = every day, week, month
export const Exercise = ( props ) => {

  //refs
  const exerciseType = useRef(null)
  const note = useRef(null)
  const arrow = useRef(null)
  const date = useRef(null)
  const minutes = useRef(null)

  // useContext
  const  { exerciseTypes, getExerciseTypes } = useContext(ExerciseTypeContext)
  const {removeExercise, editExercise } = useContext(ExerciseContext)

  // useEffect
  useEffect(() => {
    getExerciseTypes()
  }, [])

  const handleControlledInputChange = (e) => {
    const newExercise = Object.assign({}, exercise)
    newExercise[e.target.name] = e.target.value
    setExercise(newExercise)
  }

  const constructNewExercise = () => {
    const exerciseTypeId = parseInt(exerciseType.current.value)

    {editExercise({
      id: props.exercise.id,
      playerId: props.playerId,
      exerciseTypeId,
      hours: exercise.hours,
      minutes: exercise.minutes,
      date: exercise.date,
      note: exercise.note,
    })
  .then(() => props.history.push(`/players/${props.playerId}`))}
}

const [noteHidden, setNoteHidden] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [exercise, setExercise] = useState({})

  const toggleHidden = () => {
    if (noteHidden === true) {
      setNoteHidden(false)}
    else {
      setNoteHidden(true)}}

  const toggleEditMode = () => {
    if (editMode === true) {
      setEditMode(false)}
    else {
      setEditMode(true)}}

  return (
    <>
      {editMode
        ?
        <>
          <div className="cont--form-edit-ex">
            <input type="date" defaultValue={props.exercise.date} name="date" ref={date} onChange={handleControlledInputChange} />

            <select defaultValue={props.exercise.exerciseTypeId} name="exerciseType" ref={exerciseType} id="exerciseType" className="select select--ex" onChange={handleControlledInputChange}>
              <option value="0">Select an activity</option>
                {exerciseTypes.map(et => (
                  <option key={et.id} value={et.id}>
                    {et.type}
                  </option>
                ))}
            </select>
            <div>How long did you exercise?</div>
            <input type="number" defaultValue={props.exercise.minutes} onChange={handleControlledInputChange} ref={minutes}/><span>minutes</span>

            <span>How did {props.player.name} do?</span>
            <textarea defaultValue={props.exercise.note} ref={note} name="note" className="input input--note-ex" onChange={handleControlledInputChange} />
            <button className="btn btn--submit btn--ex" type="button"
              onClick={e => {
                e.preventDefault()
                constructNewExercise()
                toggleEditMode()
              }}>
                Save Changes
            </button>
            <span className="delete-exercise"
              onClick={() => {
                removeExercise(props.key)}}>
                X
            </span>
          </div>
        </>
        :
          <section className="ex-card">
            <div className="ex-card--details">
              <span className="ex-card--detail ex-card--date">
                {props.exercise.date}
              </span>
              <span className="ex-card--detail">
                {props.exerciseType.type}
              </span>
              <div className="ex-card--stats">
                <div className="ex-card--detail">
                  Start: {props.exercise.startTime}
                </div>
                <div className="ex-card--detail">
                  Total Active Time: {props.exercise.minutes}min {props.exercise.seconds}s
                </div>
              </div>
              <div className="ex-card--detail ex-card--note">
                {noteHidden
                  ? <></>
                  : <>
                      <span className="note">
                        {props.exercise.note}
                      </span>
                      {props.isOwner
                      ?<>
                        <span className="edit" onClick={()=>toggleEditMode()}>
                            Edit
                        </span>
                        </>
                      :<></>
                      }
                    </>
                }
              </div>
              <div ref={arrow} className="down-arrow"
                onClick={()=>{
                  toggleHidden()
                }}>
                  <img className="down-arrow down-arrow-img" src="https://res.cloudinary.com/heymonicakay/image/upload/c_fill,h_15,w_25/v1600727910/wideRetriever/DEAE19D0-DFF7-4B4D-ACC4-59ACB2B62B1D_g75deb.png" alt=""/>
              </div>
            </div>
          </section>
      }
    </>
  )
}