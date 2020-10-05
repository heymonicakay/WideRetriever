import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { ExerciseGoalContext} from "./ExerciseGoalProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
import { FrequencyContext } from "../goals/FrequencyProvider"


import "../exercise/ExerciseForm.css"

export const ExerciseGoalForm = (props) => {
  // refs
  const goalSet = useRef(null)
  const measurementType = useRef(null)
  const frequency = useRef(null)

  const { addExerciseGoal } = useContext(ExerciseGoalContext)
  const { measurementTypes, getMeasurementTypes } = useContext(MeasurementTypeContext)
  const { frequencies, getFrequencies } = useContext(FrequencyContext)

  // // declare and set exercise state var
  // const [frequencyTypes, setFrequencyTypes] = useState({})
  // const [ measurementTypes]

  useEffect(()=>{
    getMeasurementTypes()
    getFrequencies()
  }, [])

  const [ exerciseGoal, setExerciseGoal ] = useState({})
  const [ singular, setSingular ] = useState(true)

  // func to build new exercise obj on input change
  const handleControlledInputChange = (e) => {
    if(goalSet.current.value <= 1) {
      setSingular(true)
    }
    else {
      setSingular(false)
    }
    const newExerciseGoal = Object.assign({}, exerciseGoal)
    newExerciseGoal[e.target.name] = e.target.value
    setExerciseGoal(newExerciseGoal)
  }

  const constructNewExerciseGoal = () => {
    //define player ID
    const playerId = parseInt(props.match.params.playerId)

    // call the func add exercise and pass it the arg of a whole exercise obj and then take the user back to the player details view
    {addExerciseGoal({
      playerId,
      goalSet: exerciseGoal.goalSet,
      measurementTypeId: parseInt(measurementType.current.value),
      frequencyId: parseInt(frequency.current.value),
      timestamp: Date.now(),
      date: today,
    })
      .then(() => props.history.push(`/players/${playerId}`))}
  }

  // translate alien timstamp into human date
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')

  // exposing functionality to get and set player
  const { getPlayerByPlayerId } = useContext(PlayerContext)
  const [player, setPlayer] = useState({})

  // get whole player obj then set player
  useEffect(() => {
    const playerId = parseInt(props.match.params.playerId)
      getPlayerByPlayerId(playerId)
        .then(setPlayer)
  }, [])

  return (
    <div className="cont--form-ex">
      <section className="form">
        <h1 className="h1 header__form header__form--ex">
          Add a New Exercise Goal for {player.name}
        </h1>

        <label forHTML="goalSet">How often would you like {player.name} to exercise?</label>

        <input type="number" defaultValue="" min="1" max="60" step="5" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange} />

        {singular
          ?
          <>
            <select defaultValue="" name="measurementType" ref={measurementType} id="measurementType" className="select select--mt" onChange={handleControlledInputChange}>
              {measurementTypes.map(mt => (
                  <option key={mt.id} value={mt.id}>
                      {mt.measurement}
                  </option>
              ))}
          </select>
          </>
          :
          <>
          <select defaultValue="" name="measurementType" ref={measurementType} id="measurementType" className="select select--mt" onChange={handleControlledInputChange}>
              {measurementTypes.map(mt => (
                  <option key={mt.id} value={mt.id}>
                      {mt.plural}
                  </option>
              ))}
          </select>
          </>
        }

        <label forHTML="frequency">every</label>

        <select defaultValue="" name="frequency" ref={frequency} id="frequency" className="select select--fq" onChange={handleControlledInputChange}>
              {frequencies.map(f => (
                  <option key={f.id} value={f.id}>
                      {f.each}
                  </option>
              ))}
          </select>

          <button className="btn btn--submit btn--ex" type="button"
              onClick={e => {
                e.preventDefault()
                constructNewExerciseGoal()
              }}>
              Set Goal!
              </button>
      </section>
    </div>
  );
}
