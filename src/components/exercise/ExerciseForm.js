import React, { useContext, useState, useEffect, useRef } from "react"
import { useStopwatch } from 'react-timer-hook'
import { PlayerContext } from "../players/PlayerProvider"
import { ExerciseContext } from "./ExerciseProvider"
import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
import { ExerciseTypeSearchDisplay } from "../exerciseType/ExerciseTypeSearchDisplay"

import "./ExerciseForm.css"


export const ExerciseForm = (props) => {
    const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({ autoStart: false })

  // refs
  const note = useRef(null)

  // expose exercise provider components to this function
  const { addExercise } = useContext(ExerciseContext)
  const { exerciseTypes, getExerciseTypes, searchTerms, setTerms } = useContext(ExerciseTypeContext)
  const { measurementTypes, getMeasurementTypes } = useContext(MeasurementTypeContext)

  // get exercise types
  useEffect(() => {
    getExerciseTypes()
    getMeasurementTypes()
  }, [])

  // declare and set exercise state var
  const [exercise, setExercise] = useState({})
  const [filteredExerciseTypes, setFilteredExerciseTypes] = useState([])

  // func to build new exercise obj on input change
  const handleControlledInputChange = (e) => {
    const newExercise = Object.assign({}, exercise)
    newExercise[e.target.name] = e.target.value
    console.log(etValue, "et value")
    setExercise(newExercise)
  }

  const constructNewExercise = () => {
    //define player ID
    const playerId = parseInt(props.match.params.playerId)

    // call the func add exercise and pass it the arg of a whole exercise obj and then take the user back to the player details view
    {addExercise({
      playerId,
      exerciseTypeId: etValue,
      date: today,
      note: exercise.note,
      timestamp: todayTimestamp
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

  useEffect(() => {
    const matchingExerciseTypes = exerciseTypes.filter(et => et.type.toLowerCase().includes(searchTerms.toLowerCase()))
    setFilteredExerciseTypes(matchingExerciseTypes)
    }, [searchTerms])

  useEffect(() => {
    setFilteredExerciseTypes(exerciseTypes)
  }, [exerciseTypes])

  const handleSearchChange = (e) => {
    setTerms(e.target.value)
  }

  const [etValue, setEtValue] = useState(0)
  const [etType, setEtType] = useState("")

  return (
    <div className="cont--form-ex">
      <section className="form">
        <h1 className="h1 header__form header__form--ex">
          {player.name}
        </h1>

        <input type="text" key={etValue} value={etType}className="exercise-type-search" onChange={handleSearchChange} />
          <ExerciseTypeSearchDisplay
          setEtType={setEtType}
          setEtValue={setEtValue}
          filteredExerciseTypes={filteredExerciseTypes}
          exerciseTypes={exerciseTypes}
          searchTerms={searchTerms}
          setTerms={setTerms}
          {...props}
          />

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
