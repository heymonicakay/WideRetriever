import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { ReminderContext } from "./ReminderProvider"
import { DateContext } from "../time/DateProvider"

import "./Reminder.css"

export const ReminderForm = (props) => {
//REFS
    const reminderNote = useRef(null)

//CONTEXT
    const { addReminder } = useContext(ReminderContext)
    const { monthArrayShort } = useContext(DateContext)
//useEffect
//STATE
    const [reminder, setReminder] = useState({})
    const [isHidden, setIsHidden] = useState(true)
    const [showNotes, setShowNotes] = useState(false)
    const [titleValue, setTitleValue] = useState("")
    const [noteValue, setNoteValue] = useState("")
    const [dateValue, setDateValue] = useState("")
    const [timeValue, setTimeValue] = useState("")
    const [isRecurring, setIsRecurring] = useState(false)
    const [recurringValue, setRecurringValue] = useState("")
    const [minDate, setMinDate] = useState("")
    const [minTime, setMinTime] = useState("")
    const [fade, setFade] = useState(false)

//HANDLE
    const handleControlledInputChange = (e) => {
        const newReminder = Object.assign({}, reminder)
        newReminder[e.target.name] = e.target.value
        setReminder(newReminder)
        console.log(timeValue, "TIME VALUE")
    }

    const reset = () => {
        setReminder({})
        setIsHidden(true)
        setShowNotes(false)
        setTitleValue("")
        setNoteValue("")
        setDateValue(minDate)
        setTimeValue(minTime)
        setIsRecurring(false)
        setRecurringValue("")
    }

    const submitReminder = () => {
        if(!titleValue){
            alert("Add a title to your reminder.")
        }
        else if(dateValue < minDate) {
            alert("Please pick a date in the future.")
        }
        else{
            constructNewReminder()
        }
    }

    const constructNewReminder = () => {
        const dueDateTimestamp = Date.now(dateValue)

        const newReminder = {
            userId: props.currentUserId,
            reminderTitle: titleValue,
            reminderNote: noteValue,
            dueDate: dateValue,
            dueDateTimestamp: dueDateTimestamp,
            timeDue: timeValue,
            dateSet: today,
            timestamp: todayTimestamp,
            dateCompleted: "",
            recurrance: recurringValue
        }
        addReminder(newReminder).then(() => reset())
    }

    const todayTimestamp = Date.now()
    const today = new Date(todayTimestamp)

    useEffect(()=>{
        if(today){
            var mo = (today.getMonth() +1)
            var d = today.getDate()
            var y = today.getFullYear()
            if(mo.length < 2) {
                mo = '0' + mo
            }
            if(d.length < 2) {
                d = '0' + d
            }

            const full = [y, mo, d].join("-")
            setMinDate(full)
            setDateValue(full)

            var h = today.getHours()
            var m = today.getMinutes()


            if(m >= 1 && m < 15) {
                m = '15'
            }
            if(m >= 15 && m < 30) {
                m = '30'
            }
            if(m >= 30 && m < 45) {
                m = '45'
            }
            if(m >= 45 && m <= 59) {
                m = '00'
                if(h == 23){
                    h = '00'
                }
                else{
                    h = h + 1
                }
            }
            if(h < 10) {
                h = `0${h}`
            }
            const clock = [h, m].join(':')
            setMinTime(clock)
            setTimeValue(clock)
        }
    }, [])

    const { getPlayerByPlayerId } = useContext(PlayerContext)
    const [player, setPlayer] = useState({})

    //HANDLE
    const handleBlur = () => {
        let timer = null
        if (!titleValue ) {
            setFade(true)
            timer = setTimeout(()=>{
                setFade(false)
                setIsHidden(true)}, 2000)
        }
        else{
            setIsHidden(false)
            setFade(false)
        }
        return()=> clearTimeout(timer)
    }

    const titleChange = (e)=>{
        setTitleValue(e.target.value)
        handleControlledInputChange(e)
    }

    const noteChange = (e)=>{
        setNoteValue(e.target.value)
        handleControlledInputChange(e)
    }

    const dateChange = (e)=>{
        setDateValue(e.target.value)
        handleControlledInputChange(e)
    }

    const timeChange = (e)=>{
        setTimeValue(e.target.value)
        handleControlledInputChange(e)
    }

    const recurringChange = (e) => {
        setRecurringValue(e.target.value)
        handleControlledInputChange(e)
    }

    const toggleNotes = () => setShowNotes(!showNotes)
    const toggleIsRecurring = () => setIsRecurring(!isRecurring)

    return (
        <div className="reminder-form">
            <input value={titleValue} placeholder="Set A New Reminder" name="reminderTitle" className="input input-reminder-title" onChange={titleChange} onFocus={()=>{
                setFade(false)
                setIsHidden(false)}} onBlur={handleBlur}/>

            <div className={`reminder-form-details ${fade ? "fade-away" : null}`} hidden={isHidden}>
                <div className="reminder-date-and-time">
                    <div className="due-date">
                        <input className="due-date-input" type="date" min={minDate} value={dateValue} name="dueDate" onChange={dateChange} />
                        <p className="validity">must be a future date</p>
                    </div>
                    <div className="due-date-time">
                        <input className="due-date-time-input" type="time" value={timeValue} name="dueDateTime" onChange={timeChange} />
                    </div>
                </div>

                <div className="reminder-notes-recur">
                    <div className="left-notes">
                        <div className={`add-notes-btn ${showNotes ? "notes-vis" : null }`}  onClick={toggleNotes}>
                            {showNotes ? "- notes" : "+ notes" }
                        </div>
                        <textarea value={noteValue} name="reminderNote" className={`input input-reminder-note ${showNotes ? "text-area-vis" : null}`} onChange={noteChange}  placeholder="Reminder notes..."/>
                    </div>
                    <div className="right-notes">
                        <div className={`recurring-btn ${isRecurring ? "is" : null }`} name="isRecurring" value={isRecurring} onClick={toggleIsRecurring}>
                            {isRecurring ? "- recurring" : "+ recurring" }
                        </div>
                        <select className={`select-recurring ${isRecurring ? "recur-vis" : null }`} value={recurringValue} name="recurrance" onChange={recurringChange}>
                            <option value="daily">daily</option>
                            <option value="weekly">weekly</option>
                            <option value="monthly">monthly</option>
                        </select>
                    </div>
                </div>

                <div className="reminder-notes-recur-bottom">
                <button className="submit-reminder" type="button" onClick={submitReminder}>
                    Submit
                </button>
                </div>
            </div>
        </div>
    );
}
