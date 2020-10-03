import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { ReminderContext } from "./ReminderProvider"
import { DateContext } from "../time/DateProvider"

import "./Reminder.css"

export const ReminderForm = (props) => {
//REFS
  const dueDate = useRef(null)
  const reminderNote = useRef(null)
  const reminderTitle = useRef(null)
  const dueDateTime = useRef(null)

//CONTEXT
  const { addReminder } = useContext(ReminderContext)
  const { monthArrayShort } = useContext(DateContext)
//EFFECT
  useEffect(()=>{
    let thisDay = new Date().toISOString().substr(0, 10)
    setDefaultDate(thisDay)
  }, [])
//STATE
  const [reminder, setReminder] = useState({})
  const [isHidden, setIsHidden] = useState(true)
  const [defaultDate, setDefaultDate] = useState("")
//HANDLE
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
      timeDue: reminder.dueDateTime,
      dateSet: today,
      timestamp: todayTimestamp,
    })
  }
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

const handleBlur = () => {
  if (reminderTitle.current.value === "" && reminderNote.current.value === "") {
    setIsHidden(true)
  }
}

const changeTime = ()=>{
  console.log(dueDateTime.current.value, "current time value")

  const timeValue = dueDateTime.current.value

}

const changeDate = () => {

  console.log(dueDate.current.value, "current value")

  const newDateFormat = new Date(dueDate.current.value).toISOString().substr(0, 10)
  console.log(newDateFormat, "new date NEW CONFIG format")

  // const newDate = newDateFormat.getDate()
  // console.log(newDate, "new date get date")
  // const monthInt = newDateFormat.getMonth()
  // const newMonth = monthArrayShort[monthInt]
  // console.log(newMonth, "new date get month")
  // const newYear = newDateFormat.getFullYear()
  // console.log(newYear, "new date get year")

  // const today = new Date()
  // if(newDateFormat > today) {
  //   console.log("future date")
  // }
  // if(newDateFormat < today) {
  //   console.log("past date")
  // }
  // if(newDateFormat === today) {
  //   console.log("today")
  // }

}

  return (
      <>
          <input ref={reminderTitle} defaultValue="" placeholder="Add a reminder..." name="reminderTitle" className="input intput-reminder-title" onChange={handleControlledInputChange} onFocus={()=>{setIsHidden(false)}} onBlur={()=>{handleBlur()}}/>

          <span className="reminder-form-details" hidden={isHidden}>

            <div className="due-date">
              <input className="due-date-input" type="date" ref={dueDate} defaultValue={defaultDate} name="dueDate" className="input input-reminder-date" onChange={handleControlledInputChange} onBlur={changeDate}/>
            </div>

            <div className="due-date-time">
              <input className="due-date-time-input" type="time" ref={dueDateTime} defaultValue="12:00:00" name="dueDateTime" className="input input-reminder-date-time" onChange={handleControlledInputChange} onBlur={changeTime}/>
            </div>

            <textarea ref={reminderNote} defaultValue="" name="reminderNote" className="input input-reminder-note" onChange={handleControlledInputChange} />
            <button className="btn" type="button"
              onClick={(e) => {
              constructNewReminder()
              setIsHidden(true)}}>
                Add Reminder
            </button>

          </span>
      </>
  );
}
