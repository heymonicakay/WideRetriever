import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { PlaytimeGoalContext} from "./PlaytimeGoalProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
import { FrequencyContext } from "../goals/FrequencyProvider"

import "../playtime/PlaytimeForm.css"

export const PlaytimeGoalForm = (props) => {
  // REFS
  const goalSet = useRef(null)
  const measurementType = useRef(null)
  const frequency = useRef(null)
  //CONTEXT
  const { getPlayerByPlayerId, player } = useContext(PlayerContext)
  const { addPlaytimeGoal } = useContext(PlaytimeGoalContext)
  const { measurementTypes, getMeasurementTypes } = useContext(MeasurementTypeContext)
  const { frequencies, getFrequencies } = useContext(FrequencyContext)
//STATE
  const [ playtimeGoal, setPlaytimeGoal ] = useState({})
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
    const handleControlledInputChange = (e) => {
      if(goalSet.current.value <= 1) {
        setSingular(true)
      }
      else {
        setSingular(false)
      }
    const newPlaytimeGoal = Object.assign({}, playtimeGoal)
    newPlaytimeGoal[e.target.name] = e.target.value
    setPlaytimeGoal(newPlaytimeGoal)
  }

  const constructNewPlaytimeGoal = () => {
    const playerId = parseInt(props.match.params.playerId)
    {addPlaytimeGoal({
      playerId,
      goalSet: parseInt(playtimeGoal.goalSet),
      timestamp: Date.now(),
      date: today,
    })
      .then(props.history.push(`/players/${playerId}`))
  }}

  const measType = measurementTypes.find(mt => mt.id === 3) || {}

  return (
    <div className="cont--form-ex">
      <section className="form">
        <h1 className="h1 header__form header__form--ex">
          Add a New Playtime Goal for {player.name}
        </h1>

        <label for="note">How often would you like {player.name} to play?</label>

        <input type="number" defaultValue="" min="0" max="10" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange} />

        {singular
          ?
          <>
            <span>
              {measType.measurement}
            </span>
          </>
          :
          <>
            <span>
              {measType.plural}
            </span>
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
                constructNewPlaytimeGoal()
              }}>
              Set Goal!
              </button>
      </section>
    </div>
  );
}
