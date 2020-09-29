import React, { useContext, useState, useEffect, useRef } from "react"
import { useStopwatch } from 'react-timer-hook'
import { PlayerContext } from "../players/PlayerProvider"
import { ExerciseContext } from "./ExerciseProvider"
import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"

import "./ExerciseForm.css"


export const ExerciseForm = (props) => {
    const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({ autoStart: false })

  // refs
  const note = useRef(null)
  const exerciseType = useRef(null)
  const newExerciseType = useRef(null)

  // expose exercise provider components to this function
  const { addExercise } = useContext(ExerciseContext)
  const { exerciseTypes, getExerciseTypes, searchTerms, addExerciseType } = useContext(ExerciseTypeContext)
  const { measurementTypes, getMeasurementTypes } = useContext(MeasurementTypeContext)

  // get exercise types
  useEffect(() => {
    getExerciseTypes()
    getMeasurementTypes()
  }, [])

  // declare and set exercise state var
  const [exercise, setExercise] = useState({})
  const [activity, setActivity] = useState({})
  const [filteredExerciseTypes, setFilteredExerciseTypes] = useState([])

  // func to build new exercise obj on input change
  const handleControlledInputChange = (e) => {
    const newExercise = Object.assign({}, exercise)
    newExercise[e.target.name] = e.target.value
    setExercise(newExercise)
  }

  const handleNewExerciseInput= (e) => {
    const newActivity = Object.assign({}, activity)
    newActivity[e.target.name] = e.target.value
    setActivity(newActivity)
  }

  const constructNewExercise = () => {
    const playerId = parseInt(props.match.params.playerId)
    {addExercise({
      playerId,
      exerciseTypeId: parseInt(exerciseType.current.value),
      date: today,
      note: exercise.note,
      timestamp: todayTimestamp
    })
      .then(() => props.history.push(`/players/${playerId}`))}
  }

  const constructNewExerciseType = () => {
    {addExerciseType({
      type: activity.newExerciseType
    })
  }
}
  // translate alien timstamp into human date
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')

  // exposing functionality to get and set player
  const { getPlayerById } = useContext(PlayerContext)
  const [player, setPlayer] = useState({})

  // get whole player obj then set player
  useEffect(() => {
    const playerId = parseInt(props.match.params.playerId)
      getPlayerById(playerId)
        .then(setPlayer)
  }, [])

  useEffect(() => {
    const matchingExerciseTypes = exerciseTypes.filter(et => et.type.toLowerCase().includes(searchTerms.toLowerCase()))
    setFilteredExerciseTypes(matchingExerciseTypes)
    }, [searchTerms])

    const toggleEdit = () =>{
      if(edit === false){
        setEdit(true)
      }
      else {
        setEdit(false)
      }
    }

    const [edit, setEdit] = useState(false)


  return (
    <div className="cont--form-ex">
      <section className="form">
        <h1 className="h1 header__form header__form--ex">
          {player.name}
        </h1>

        <select defaultValue="" name="exerciseType" ref={exerciseType} id="exerciseType" className="select select--et" onChange={handleControlledInputChange}>
              <option value="0">Select an activity</option>
              {exerciseTypes.map(et => (
                  <option key={et.id} value={et.id}>
                      {et.type}
                  </option>
              ))}
        </select>
        <p className="add-ex-type" onClick={toggleEdit}>Add Activity +</p>
        {edit
          ?
          <>
          <input className="input-ex-type" name="newExerciseType" onChange={handleNewExerciseInput} ref={newExerciseType}/>
          <button onClick={()=>{
            constructNewExerciseType()
            toggleEdit()}}>
              Save
          </button>
          </>
          :
          <>
          </>
        }

          <div>
            <div style={{textAlign: 'center'}}>
              <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={reset}>Reset</button>
          </div>

          <label>How did {player.name} do?</label>

          <textarea ref={note} name="note" className="input input--note-ex" onChange={handleControlledInputChange} />

          <button className="btn btn--submit btn--ex" type="button"
              onClick={e => {
                e.preventDefault()
                constructNewExercise()
              }}>
              Save Exercise Session
              </button>
      </section>
    </div>
  );
}
