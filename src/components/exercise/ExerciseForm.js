import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { ExerciseContext } from "./ExerciseProvider"
import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"

import "./ExerciseForm.css"

export const ExerciseForm = (props) => {
  // refs
  const duration = useRef(null)
  const exerciseType = useRef(null)
  const note = useRef(null)

  // expose exercise provider components to this function
  const { addExercise } = useContext(ExerciseContext)

  const { exerciseTypes, getExerciseTypes } = useContext(ExerciseTypeContext)

  useEffect(() => {
    getExerciseTypes()
  }, [])

  // declare and set exercise state var
  const [exercise, setExercise] = useState({})

  // func to build new exercise obj on input change
  const handleControlledInputChange = (e) => {
    const newExercise = Object.assign({}, exercise)

    newExercise[e.target.name] = e.target.value

    setExercise(newExercise)
  }

  const constructNewExercise = () => {
    //define player ID
    const playerId = parseInt(props.match.params.playerId)

    // define exerciseTypeId
    const exerciseTypeId = parseInt(exerciseType.current.value)

    // call the func add exercise and pass it the arg of a whole exercise obj and then take the user back to the player details view
    {addExercise({
      playerId,
      exerciseTypeId,
      duration: exercise.duration,
      date: today,
      note: exercise.note,
    })
      .then(() => props.history.push(`/players/${playerId}`))}
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

  return (
    <div className="cont--form-ex">
      <section className="form">
        <h1 className="h1 header__form header__form--ex">
          {player.name}
        </h1>

        <input type="text" ref={duration} name="duration" className="input input--ex input--duration" placeholder="Enter exercise duration" onChange={handleControlledInputChange}/>

        <select defaultValue="" name="exerciseType" ref={exerciseType} id="exerciseType" className="select select--ex" onChange={handleControlledInputChange}>
              <option value="0">Select an exercise</option>
              {exerciseTypes.map(et => (
                  <option key={et.id} value={et.id}>
                      {et.type}
                  </option>
              ))}
          </select>
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
