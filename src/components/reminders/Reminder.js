import React, { useState, useEffect, useContext } from "react"
import { ReminderContext } from "./ReminderProvider"
import "./Reminder.css"

export const Reminder = (props) =>{
    const { reminders, getReminders,  addReminder, removeReminder, patchReminder } = useContext(ReminderContext)

    const [completed, setCompleted] = useState(props.completed ? true : false)
    const [isDueToday, setIsDueToday] = useState(false)
    const [isPassedDue, setIsPassedDue] = useState(false)
    const [dueDate, setDueDate] = useState("")
    const [thisDay, setThisDay] = useState("")
    const todayTimestamp = Date.now()
    const today = new Date(todayTimestamp)
    useEffect(()=>{
        const [year, month, day] = props.reminder.dueDate.split("-")
        const newDueDate = `${month}/${day}/${year}`
        const thisDay = new Date().toLocaleDateString('en-US', {month: "2-digit", day: "2-digit", year: "numeric"})
        setDueDate(newDueDate)
        setThisDay(thisDay)
    },[])
    useEffect(()=> {
        !props.completed && setIsDueToday((dueDate === thisDay) ? true : false)
    },[dueDate, thisDay])

    const getTheDate = (dt) => {
        var date = new Date(dt)
        var mo = (date.getMonth() +1)
        var d = date.getDate()
        var y = date.getFullYear()
        if(mo < 10) {
            mo = `0${mo}`
        }
        if(d < 10) {
            d = `0${d}`
        }
        return [y, mo, d].join("-")
    }

    const dateCompleted = new Date(props.reminder.dateCompleted)

    const parent = (e) => {
        return ( e.parent ? e.parent : e.id )
    }

    const getNewReminder = (e, n) => {
        const newReminder = {
            parent: parent(e),
            userId: e.userId,
            reminderTitle: e.reminderTitle,
            reminderNote: e.reminderNote,
            dueDate: getTheDate(n),
            dueDateTimestamp: n,
            timeDue: e.timeDue,
            dateSet: today,
            timestamp: todayTimestamp,
            dateCompleted: "",
            recurrance: e.recurrance
        }
        return newReminder
    }

    const markComplete = (e) => {
        if(!e.dateCompleted){
            const completeReminder = {
                id: e.id,
                dateCompleted: thisDay
            }
            patchReminder(completeReminder).then(()=>{
                if(e.recurrance === "daily"){
                    const oneDay = 24 * 60 * 60 * 1000
                    const next = (e.dueDateTimestamp + oneDay)
                    const newReminder = getNewReminder(e, next)
                    addReminder(newReminder)
                }
                else if(e.recurrance === "weekly"){
                    const oneWeek = 7 * 24 * 60 * 60 * 1000
                    const next = (e.dueDateTimestamp + oneWeek)
                    const newReminder = getNewReminder(e, next)
                    addReminder(newReminder)
                }
                else if(e.recurrance === "monthly"){
                    const oneMonth = 28 * 24 * 60 * 60 * 1000
                    const next = (e.dueDateTimestamp + oneMonth)
                    const newReminder = getNewReminder(e, next)
                    addReminder(newReminder)
                }
            })
        }
        else{
            const incompleteReminder = {
                id: e.id,
                dateCompleted: ""
            }
            patchReminder(incompleteReminder)
        }
    }

    return (
        <>
        <section className={`reminder-card ${!props.reminder.dateCompleted && "red"} ${isDueToday && "due-today"}`}>
            <div className="reminder-main">
                {isDueToday && "Due Today" }
                <div className="reminder-title">
                    {props.reminder.reminderTitle}
                </div>
                <div className="reminder-date">
                    {dueDate}
                </div>
            </div>
            <div className="reminder-note">
                {props.reminder.reminderNote}
            </div>

            {props.completed
            ? <div className="completed">
                <div className="mark-incomplete" title={`Completed on ${props.reminder.dateCompleted}`} onClick={()=>markComplete(props.reminder)}>
                    {props.completed && `Completed`}
                </div>
            </div>
            : <div className="incomplete">
                <div className="mark-complete" onClick={()=>markComplete(props.reminder)}>
                    Mark Complete
                </div>
            </div>
            }

            <div title="Delete this reminder." className="delete-reminder-button" onClick={()=>removeReminder(props.reminder.id)}></div>
        </section>
        </>
    )
}
