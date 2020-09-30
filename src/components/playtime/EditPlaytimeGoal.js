import React, { useRef, useState, useContext} from "react"
import { PlaytimeGoalContext } from "../playtimeGoals/PlaytimeGoalProvider"

//refs
const goalSet = useRef(null)
const thisWeek = props.playtimesThisWeek.length

const { editPlaytimeGoal } = useContext(PlaytimeGoalContext)
const handleControlledInputChange = (e) => {
  const newPlayerPlaytimeGoal = Object.assign({}, playerPlaytimeGoal)
  newPlayerPlaytimeGoal[e.target.name] = e.target.value
  setPlayerPlaytimeGoal(newPlayerPlaytimeGoal)
}

const constructNewPlaytimeGoal = () => {
  //define player ID

  {editPlaytimeGoal({
    id: props.playerPlaytimeGoal.id,
    playerId: props.playerId,
    goalSet: props.playerPlaytimeGoal.goalSet,
    timestamp: props.currentTimestamp,
    date: props.todayObj,
  })
  .then(() => props.history.push(`/players/${props.playerId}`))}
}

{editMode
  ?<>
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
      constructNewPlaytimeGoal()
      toggleEditMode()
    }}>
    Update Goal!
    </button>
  </>
  :
  <>
  <div className="exercise-goals" onClick={toggleEditMode}>
    Goal:
    <br />
    {props.playerPlaytimeGoal.goalSet}
    </div>

    <div className="playtime-acheived">
  Acheived:
  <br />
  {thisWeek}
  </div>
  </>
  }