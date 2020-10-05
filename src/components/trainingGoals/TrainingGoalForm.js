import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { TrainingGoalContext} from "./TrainingGoalProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
import { FrequencyContext } from "../goals/FrequencyProvider"

import "../training/TrainingForm.css"

export const TrainingGoalForm = (props) => {
// REFS
  const goalSet = useRef(null)
  const measurementType = useRef(null)
  const frequency = useRef(null)
//CONTEXT
const { addTrainingGoal } = useContext(TrainingGoalContext)
const { player, getPlayerByPlayerId  } = useContext(PlayerContext)
const { measurementTypes, getMeasurementTypes } = useContext(MeasurementTypeContext)
  const { frequencies, getFrequencies } = useContext(FrequencyContext)
//STATE
  const [ trainingGoal, setTrainingGoal ] = useState({})
  const [ singular, setSingular ] = useState(true)
  const playerId = parseInt(props.match.params.playerId)
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')
//EFFECT
useEffect(() => {
  getMeasurementTypes()
    getFrequencies()
    getPlayerByPlayerId(playerId)
}, [])
//HANDLE
const constructNewTrainingGoal = () => {
  const playerId = parseInt(props.match.params.playerId)
  {addTrainingGoal({
    playerId,
    goalSet: parseInt(trainingGoal.goalSet),
    measurementTypeId: parseInt(measurementType.current.value),
      frequencyId: parseInt(frequency.current.value),
    timestamp: Date.now(),
    date: today,
  })
    .then(() => props.history.push(`/players/goals/playtime/add/${playerId}`))}
  }
  const handleControlledInputChange = (e) => {
    if(goalSet.current.value <= 1) {
      setSingular(true)
    }
    else {
      setSingular(false)
    }
    const newTrainingGoal = Object.assign({}, trainingGoal)
    newTrainingGoal[e.target.name] = e.target.value
    setTrainingGoal(newTrainingGoal)
  }


  return (
    <div className="cont--form-ex">
      <section className="form">
        <h1 className="h1 header__form header__form--ex">
          Add a New Training Goal for {player.name}
        </h1>

        <label for="note">How often would you like {player.name} to train?</label>

        <input type="number" defaultValue="" min="0" max="60" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange} />

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
                constructNewTrainingGoal()
              }}>
              Set Goal!
              </button>
      </section>
    </div>
  );
}
