import React, { useContext, useState, useEffect } from "react"
import { Reminder } from "./Reminder"
import { ReminderContext } from "./ReminderProvider"
import "./Reminder.css"

export const ReminderList = (props) => {
  const { reminders, getReminders, removeReminder, patchReminder } = useContext(ReminderContext)

  const [sortedList, setSortedList] = useState([])

useEffect(()=>{
  getReminders()
}, [])

useEffect(()=>{
  const sorted = reminders.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)) || []
  const filtered = sorted.filter(s=> s.userId === props.currentUserId)

  setSortedList(filtered)
}, [reminders])

  return(
    <>
    {sortedList.map(r=>{
      return <Reminder
        {...props}
        key={r.id}
        reminder={r}
        currentUserId={props.currentUserId}
        removeReminder={removeReminder}
        patchReminder={patchReminder}
        getReminders={getReminders}/>
    }).reverse()
  }
  </>
  )
}