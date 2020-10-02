import React from "react"
import "./Reminder.css"

export const Reminder = (props) =>{
  return (
    <>
    <section className="reminder-card">
      <div className="reminder-main">
        <div className="reminder-title">{props.reminder.reminderTitle}</div>
        <div className="reminder-date">{props.reminder.dueDate}</div>
      </div>
      <div className="reminder-note">{props.reminder.reminderNote}</div>
      <span>Delete</span>
    </section>
    </>
  )
}