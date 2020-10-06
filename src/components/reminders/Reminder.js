import React, { useState, useEffect } from "react"
import "./Reminder.css"

export const Reminder = (props) =>{

  const [completed, setCompleted] = useState(null)
  const [isDueToday, setIsDueToday] = useState(false)
  const [dueDate, setDueDate] = useState("")
  const [thisDay, setThisDay] = useState("")

  useEffect(()=>{
    if(props.reminder.isCompleted === false){
      setCompleted(false)
    }
    else if(props.reminder.isCompleted === true){
      setCompleted(true)
    }
  }, [])

  useEffect(()=>{
    const year = props.reminder.dueDate.slice(0, 4)
    const month = props.reminder.dueDate.slice(5, 7)
    const day = props.reminder.dueDate.slice(8, 10)

    const newDueDate = `${month}/${day}/${year}`
    const thisDay = new Date().toLocaleDateString('en-US', {month: "2-digit", day: "2-digit", year: "numeric"})
    setDueDate(newDueDate)
    setThisDay(thisDay)
  },[])

  useEffect(()=>{
    if(dueDate === thisDay){
      setIsDueToday(true)
    }
    else if(dueDate !== thisDay){
      setIsDueToday(false)
    }
  },[dueDate, thisDay])

  const completedDate = new Date(props.reminder.completedDate)

  return (
    <>
    <section className={`reminder-card ${isDueToday ? "red": ""}`}>
      <div className="reminder-main">

        <div className="reminder-title">{props.reminder.reminderTitle}</div>
        <div className="reminder-date">{props.reminder.dueDate}</div>
      </div>
      <div className="reminder-note">{props.reminder.reminderNote}</div>

      {completed
      ? <div className="completed">

          <div> Completed on: {props.reminder.completedDate}</div>
          <div className="mark-incomplete" onClick={()=>{
          if(props.reminder.isCompleted === true){
            const updatedReminder = {
              id: props.reminder.id,
              isCompleted: false,
              completedDate: "",
            }
            props.patchReminder(updatedReminder)
            .then(props.getReminders())
            .then(setCompleted(false))
          }}}> Mark Incomplete </div>

        </div>
      :
      <div className="incomplete">
        <div className="mark-complete" onClick={()=>{
        if(props.reminder.isCompleted === false){
          const updatedReminder = {
            id: props.reminder.id,
            isCompleted: true,
            completedDate: Date.now(),
          }
          props.patchReminder(updatedReminder)
          .then(setCompleted(true))
        }}}> Mark Complete </div>
      </div>
      }

      <div className="delete-reminder" onClick={()=>{props.removeReminder(props.reminder.id)}}>Delete</div>

    </section>
    </>
  )
}