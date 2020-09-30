import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { TrainingGoalContext} from "./TrainingGoalProvider"

import "../training/TrainingForm.css"

export const TrainingGoalForm = (props) => {
  // refs
  const goalSet = useRef(null)

  const { addTrainingGoal } = useContext(TrainingGoalContext)

  const [ trainingGoal, setTrainingGoal ] = useState({})

  // func to build new training obj on input change
  const handleControlledInputChange = (e) => {
    const newTrainingGoal = Object.assign({}, trainingGoal)

    newTrainingGoal[e.target.name] = e.target.value

    setTrainingGoal(newTrainingGoal)
  }

  const constructNewTrainingGoal = () => {
    //define player ID
    const playerId = parseInt(props.match.params.playerId)

    // call the func add training and pass it the arg of a whole training obj and then take the user back to the player details view
    {addTrainingGoal({
      playerId,
      goalSet: trainingGoal.goalSet,
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
          Add a New Training Goal for {player.name}
        </h1>

        <label for="note">How often would you like {player.name} to training?</label>

        <select defaultValue="" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange}>
          <option value="0">0</option>
          <option value="1">1 day a week</option>
          <option value="2">2 days a week</option>
          <option value="3">3 days a week</option>
          <option value="4">4 days a week</option>
          <option value="5">5 days a week</option>
          <option value="6">6 days a week</option>
          <option value="7">7 days a week</option>
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
