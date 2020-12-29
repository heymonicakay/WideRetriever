import React, { useContext, useState, useEffect } from "react"
import { Reminder } from "./Reminder"
import { ReminderContext } from "./ReminderProvider"
import "./Reminder.css"

export const ReminderList = (props) => {
    const { reminders, getReminders } = useContext(ReminderContext)

    const [done, setDone] = useState([])
    const [notDone, setNotDone] = useState([])
    const [dueToday, setDueToday] = useState([])

    useEffect(() => {
        getReminders()
    }, [])

    useEffect(()=> {
        const thisDay = new Date().toLocaleDateString('en-US', {month: "2-digit", day: "2-digit", year: "numeric"})

        const dueToday = reminders.filter(r => {
            const [y, mo, d] = r.dueDate.split("-")
            const due = `${mo}/${d}/${y}`
            return (due === thisDay ? r : false)
        })
        setDueToday(dueToday)

        const userReminders = reminders.filter(r => r.userId === props.currentUserId)
        const completed = []
        const incomplete = []
        userReminders.forEach(r => {
            if(r.dateCompleted !== ""){
                completed.push(r)
            }
            else{
                incomplete.push(r)
            }
        })
        const completedList = completed.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) || []
        const incompleteList = incomplete.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)) || []

        setDone(completedList)
        setNotDone(incompleteList)

    }, [reminders])

    return(
        <>
        {props.filterBy &&
            props.filterBy === "today" ?
                dueToday.length > 0 ?
                    dueToday.map( r => {

                        return ( !r.dateCompleted &&
                            <Reminder
                            {...props}
                            key={r.id}
                            reminder={r}
                            currentUserId={props.currentUserId} />
                        )
                    })
                    : <div className="nothing-due-today"> Nothing due today! </div>

            : props.filterBy === "upcoming" ?
                notDone.map( r => {
                    return <Reminder
                        {...props}
                        key={r.id}
                        reminder={r}
                        currentUserId={props.currentUserId}
                        />
                })
            : props.filterBy === "completed" ?
                done.map( r => {
                    return <Reminder
                        {...props}
                        key={r.id}
                        reminder={r}
                        currentUserId={props.currentUserId}
                        completed
                        />
                })
            : <div className="no-reminders-yet">No reminders</div>
        }
        </>
    )
}
// {!dueToday ? "No tasks due today."
// : `${dueToday.filter(r => r.dateCompleted).length} out of ${dueToday.length} tasks completed`}