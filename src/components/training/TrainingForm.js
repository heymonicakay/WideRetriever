import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { TrainingContext } from "./TrainingProvider"
import { TrainingTypeContext } from "../trainingType/TrainingTypeProvider"

import "./TrainingForm.css"

export const TrainingForm = (props) => {
  // refs
  const duration = useRef(null)
  const trainingType = useRef(null)
  const note = useRef(null)

  // expose training provider components to this function
  const { addTraining } = useContext(TrainingContext)

  const { trainingTypes, getTrainingTypes } = useContext(TrainingTypeContext)

  useEffect(() => {
    getTrainingTypes()
  }, [])

  // declare and set training state var
  const [training, setTraining] = useState({})

  // func to build new training obj on input change
  const handleControlledInputChange = (e) => {
    const newTraining = Object.assign({}, training)

    newTraining[e.target.name] = e.target.value

    setTraining(newTraining)
  }

  const constructNewTraining = () => {
    debugger
    //define player ID
    const playerId = parseInt(props.match.params.playerId)

    // define trainingTypeId
    const trainingTypeId = parseInt(trainingType.current.value)

    // call the func add training and pass it the arg of a whole training obj and then take the user back to the player details view
    {addTraining({
      playerId,
      trainingTypeId,
      duration: training.duration,
      date: today,
      note: training.note,
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
    <div className="cont--form-tr">
      <section className="form">
        <h1 className="h1 header__form header__form--tr">
          {player.name}
        </h1>

        <input type="text" ref={duration} name="duration" className="input input--tr input--duration" placeholder="Enter training duration" onChange={handleControlledInputChange}/>

        <select defaultValue="" name="trainingType" ref={trainingType} id="trainingType" className="select select--tr" onChange={handleControlledInputChange}>
              <option value="0">Select a behavior</option>
              {trainingTypes.map(tt => (
                  <option key={tt.id} value={tt.id}>
                      {tt.type}
                  </option>
              ))}
          </select>
          <textarea ref={note} name="note" className="input input--note-tr" onChange={handleControlledInputChange} />
          <button className="btn btn--submit btn--tr" type="button"
            onClick={e => {
                e.preventDefault()
                constructNewTraining()
            }}>
            Save Training Session
        </button>
      </section>
    </div>
  );
}
