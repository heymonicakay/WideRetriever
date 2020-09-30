import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { ReminderContext } from "./ReminderProvider"

import "./Reminder.css"

export const ReminderForm = (props) => {
  // refs
  const dueDate = useRef(null)
  const reminderNote = useRef(null)
  const reminderTitle = useRef(null)

  const { addReminder } = useContext(ReminderContext)
  const [reminder, setReminder] = useState({})

  // func to build new reminder obj on input change
  const handleControlledInputChange = (e) => {
    const newReminder = Object.assign({}, reminder)
    newReminder[e.target.name] = e.target.value
    setReminder(newReminder)
  }

  const constructNewReminder = () => {
    const userId = props.currentUserId

    if( reminderTitle.current.value === "" || reminderNote.current.value === "" || dueDate.current.value === ""){
      alert("Please fill out all fields")
    }
    else{
    {addReminder({
      userId,
      reminderTitle: reminder.reminderTitle,
      reminderNote: reminder.reminderNote,
      dueDate: reminder.dueDate,
      dateSet: today,
      timestamp: todayTimestamp,
    })
      .then(() => props.history.push(`/players`))}
  }
  }

  // translate alien timstamp into human date
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')

  // exposing functionality to get and set player
  const { getPlayerByPlayerId } = useContext(PlayerContext)
  const [player, setPlayer] = useState({})

  // get whole player obj then set player
  // useEffect(() => {
  //   const playerId = parseInt(props.match.params.playerId)
  //     getPlayerByPlayerId(playerId)
  //       .then(setPlayer)
  // }, [])

  return (
      <>
          <input ref={reminderTitle} defaultValue="" placeholder="Add a reminder..." name="reminderTitle" className="input intput-reminder-title" onChange={handleControlledInputChange} />

          <div className="due-date">
          <input className="due-date-input" type="date" ref={dueDate} defaultValue="" name="dueDate" className="input input-reminder-date" onChange={handleControlledInputChange} />
          </div>

          <textarea ref={reminderNote} defaultValue="" name="reminderNote" className="input input-reminder-note" onChange={handleControlledInputChange} />

          <button className="btn" type="button"
            onClick={() => {
                constructNewReminder()
            }}>
              Add Reminder
            </button>
      </>
  );
}
