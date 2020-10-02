import React, { useContext } from "react"
import { Reminder } from "./Reminder"
import { ReminderContext } from "./ReminderProvider"
import "./Reminder.css"

export const ReminderList = (props) => {
  const { reminders } = useContext(ReminderContext)

  return(
    <>
    {reminders.map(r=>{
      return <Reminder
        {...props}
        key={r.id}
        reminder={r}
        currentUserId={props.currentUserId} />
    })
  }
  </>
  )
}