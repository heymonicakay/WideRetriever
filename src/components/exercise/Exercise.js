import React, { useContext, useState, useEffect, useRef } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"
import { PlayerContext } from "../players/PlayerProvider"
import "./Exercise.css"

export const Exercise = ( props ) => {
  //define user id
  const userId = parseInt(sessionStorage.getItem("wr__user"))

  //refs
  const duration = useRef(null)
  const exerciseType = useRef(null)
  const note = useRef(null)

  // useContext

  const  { exerciseTypes, getExerciseTypes } = useContext(ExerciseTypeContext)
  const {removeExercise, editExercise } = useContext(ExerciseContext)

  // useEffect
  useEffect(() => {
    getExerciseTypes()
  }, [])

  // func to build new exercise obj on input change
  const handleControlledInputChange = (e) => {
    const newExercise = Object.assign({}, exercise)

    newExercise[e.target.name] = e.target.value

    setExercise(newExercise)
  }

  const constructNewExercise = () => {
    //define player ID
    const playerId = parseInt(props.exercise.playerId)

    // define exerciseTypeId
    const exerciseTypeId = parseInt(exerciseType.current.value)

    //define exerciseId
    const exerciseId = parseInt(props.exercise.id)

  {editExercise({
    id: props.exercise.id,
    playerId,
    exerciseTypeId,
    duration: exercise.duration,
    date: today,
    note: exercise.note,
    rating: exercise.rating
  })
  .then(() => props.history.push(`/players/${playerId}`))}
}

const [noteHidden, setNoteHidden] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [exercise, setExercise] = useState({})

  // translate alien timestamp into human date
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')

  // exposing functionality to get and set player
  const { getPlayerById } = useContext(PlayerContext)
  const [player, setPlayer] = useState({})

  //useEffect
  useEffect(() => {
    const playerId = parseInt(props.match.params.playerId)
      getPlayerById(playerId)
        .then(setPlayer)
  }, [])

  //toggles whether the exercise note is hidden or not
  const toggleHidden = () => {
    if (noteHidden === true) {
      setNoteHidden(false)
    } else {
      setNoteHidden(true)
    }
}
  //toggles edit mode for individual exercise session
  const toggleEditMode = () => {
    if (editMode ===true) {
      setEditMode(false)
    }
    else {
      setEditMode(true)
    }
  }
  //verifies user and displays player's exercise data accordingly
  const ExerciseVerify = () => {
    if(userId === player.userId) {
      return (
        <>
          {editMode
            ?
            <>
                <div className="cont--form-edit-ex">
                    <select ref={duration} name="duration" className="input input--ex-edit input--duration" defaultValue={props.exercise.duration} onChange={handleControlledInputChange}>
                      <option value="0">How long did you exercise?</option>
                      <option value="5-10 min">5-10 min</option>
                      <option value="10-20 min">10-20 min</option>
                      <option value="20-30 min">20-30 min</option>
                      <option value="30-40 min">30-40 min</option>
                      <option value="40-50 min">40-50 min</option>
                      <option value="50-60 min">50-60 min</option>
                    </select>

                    <select defaultValue={props.exercise.exerciseTypeId} name="exerciseType" ref={exerciseType} id="exerciseType" className="select select--ex" onChange={handleControlledInputChange}>
                      <option value="0">Select an activity!</option>
                        {exerciseTypes.map(et => (
                          <option key={et.id} value={et.id}>
                            {et.type}
                          </option>
                        ))}
                    </select>

                    <label htmlfor="note">How did {player.name} do?</label>

                    <textarea defaultValue={props.exercise.note} ref={note} name="note" className="input input--note-ex" onChange={handleControlledInputChange} />

                    <button className="btn btn--submit btn--ex" type="button"
                      onClick={e => {
                        e.preventDefault()
                        constructNewExercise()
                        toggleEditMode()
                      }}>
                        Save Changes
                    </button>
                </div>
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
    else {
      return (
        <>
          {editMode
            ?
            <>
                <div className="cont--form-edit-ex">
                    <select ref={duration} name="duration" className="input input--ex-edit input--duration" defaultValue={props.exercise.duration} onChange={handleControlledInputChange}>
                      <option value="0">How long did you exercise?</option>
                      <option value="5-10 min">5-10 min</option>
                      <option value="10-20 min">10-20 min</option>
                      <option value="20-30 min">20-30 min</option>
                      <option value="30-40 min">30-40 min</option>
                      <option value="40-50 min">40-50 min</option>
                      <option value="50-60 min">50-60 min</option>
                    </select>

                    <select defaultValue={props.exercise.exerciseTypeId} name="exerciseType" ref={exerciseType} id="exerciseType" className="select select--ex" onChange={handleControlledInputChange}>
                      <option value="0">Select an activity!</option>
                        {exerciseTypes.map(et => (
                          <option key={et.id} value={et.id}>
                            {et.type}
                          </option>
                        ))}
                    </select>

                    <label htmlfor="note">How did {player.name} do?</label>

                    <textarea defaultValue={props.exercise.note} ref={note} name="note" className="input input--note-ex" onChange={handleControlledInputChange} />

                    <button className="btn btn--submit btn--ex" type="button"
                      onClick={e => {
                        e.preventDefault()
                        constructNewExercise()
                        toggleEditMode()
                      }}>
                        Save Changes
                    </button>
                </div>
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
                          </>
                      }
                  </div>
                </div>
              </section>
          }
        </>
      )
    }
  }
  return (
    <>
      {ExerciseVerify()}
    </>
  )
}