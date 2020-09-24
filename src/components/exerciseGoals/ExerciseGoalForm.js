import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { ExerciseGoalContext} from "./ExerciseGoalProvider"

import "../exercise/ExerciseForm.css"

export const ExerciseGoalForm = (props) => {
  // refs
  const goalSet = useRef(null)

  const { addExerciseGoal } = useContext(ExerciseGoalContext)

  // // declare and set exercise state var
  // const [frequencyTypes, setFrequencyTypes] = useState({})
  // const [ measurementTypes]

  const [ exerciseGoal, setExerciseGoal ] = useState({})

  // func to build new exercise obj on input change
  const handleControlledInputChange = (e) => {
    const newExerciseGoal = Object.assign({}, exerciseGoal)

    newExerciseGoal[e.target.name] = e.target.value

    setExerciseGoal(newExerciseGoal)
  }

  const constructNewExerciseGoal = () => {
    //define player ID
    const assignedPlayerId = parseInt(props.match.params.playerId)

    // call the func add exercise and pass it the arg of a whole exercise obj and then take the user back to the player details view
    {addExerciseGoal({
      assignedPlayerId,
      goalSet: exerciseGoal.goalSet,
      timestamp: Date.now(),
      date: today,
    })
      .then(() => props.history.push(`/players/${assignedPlayerId}`))}
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
          Add a New Exercise Goal for {player.name}
        </h1>

        <label for="note">How often would you like {player.name} to exercise?</label>

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
                constructNewExerciseGoal()
              }}>
              Set Goal!
              </button>
      </section>
    </div>
  );
}
