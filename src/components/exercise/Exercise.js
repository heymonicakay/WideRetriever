import React, { useContext, useState, useEffect, useRef } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"
import { PlayerContext } from "../players/PlayerProvider"
import "./Exercise.css"

// goalset = x many
// measurement type = minute, hour, times
//frequency = every day, week, month
export const Exercise = ( props ) => {
    const userId = parseInt(sessionStorage.getItem("wr__user"))
//refs
    const exerciseType = useRef(null)
    const note = useRef(null)
    const arrow = useRef(null)

// useContext
    const  { exerciseTypes, getExerciseTypes } = useContext(ExerciseTypeContext)
    const {removeExercise, editExercise } = useContext(ExerciseContext)

// useEffect
    useEffect(() => {
        getExerciseTypes()
    }, [])

    const handleControlledInputChange = (e) => {
        const newExercise = Object.assign({}, exercise)
        newExercise[e.target.name] = e.target.value
        setExercise(newExercise)
    }

    const constructNewExercise = () => {
        const playerId = parseInt(props.exercise.playerId)
        const exerciseTypeId = parseInt(exerciseType.current.value)
        const newNote = note.current.value
        const exerciseId = parseInt(props.exercise.id)
        const minutes = parseInt(props.exercise.minutes)
        const seconds = parseInt(props.exercise.seconds)
        const date = props.exercise.date
        const timestamp = parseInt(props.exercise.timestamp)

        const newExerciseObject = {
            id: exerciseId,
            playerId: playerId,
            startTime: props.exercise.startTime,
            endTime: props.exercise.endTime,
            exerciseTypeId,
            minutes: minutes,
            seconds: seconds,
            date: date,
            note: newNote,
            timestamp: timestamp
        }
        editExercise(newExerciseObject)
            .then(toggleEditMode())
    }

//useState
    const [noteHidden, setNoteHidden] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [exercise, setExercise] = useState({})

    const toggleHidden = () => setNoteHidden(!noteHidden)
    const toggleEditMode = () => setEditMode(!editMode)

    const ExerciseVerify = () =>{
        return (
            <section className="tr-card">
                <div className="tr-card--details">
                    <div className="tr-card--detail tr-card--date">
                        {editMode
                        ? <select
                        defaultValue={props.exercise.exerciseTypeId}
                        name="Type"
                        ref={exerciseType}
                        id="exerciseType"
                        className="select select--edit-tr"
                        onChange={handleControlledInputChange}>
                            <option value="0"></option>
                            {exerciseTypes.map(tt => (
                                <option key={tt.id} value={tt.id}>
                                    {tt.type}
                                </option>
                            ))}
                        </select>
                        : <div className="behavior">
                            {props.exerciseType.type}
                        </div>
                        }
                        <div className="date">
                            {props.exercise.date}
                        </div>
                        {editMode
                        ? <div title="Delete this exercise session." className="delete-training-button" onClick={() => {
                            removeExercise(props.exercise.id)
                        }}></div>
                        : <div ref={arrow} className="arrow" onClick={toggleHidden}>
                            <img className="down-arrow down-arrow-img" src={noteHidden ? "https://res.cloudinary.com/heymonicakay/image/upload/a_90/v1601408603/wideRetriever/FB962FED-6991-4FCE-8D65-1A3A33211BA9_rnqjrl.png" : "https://res.cloudinary.com/heymonicakay/image/upload/a_270/v1601408603/wideRetriever/FB962FED-6991-4FCE-8D65-1A3A33211BA9_rnqjrl.png" } alt=""/>
                        </div>
                        }
                    </div>
                    <div className={`tr-card--stats ${noteHidden ? "hide" : "show"}`}>
                        <div className="start-and-end-time">
                            <div className="tr-card--detail tr-card--duration">
                                {props.exercise.startTime} - {props.exercise.endTime}
                            </div>
                        </div>
                        {editMode
                        ? <textarea
                        defaultValue={props.exercise.note}
                        ref={note}
                        name="note"
                        className="input input--edit-note-tr"
                        onChange={handleControlledInputChange} />
                        : <div className="tr-card-note">
                            {props.exercise.note}
                        </div>
                        }
                        {props.isOwner
                        ?<>
                            {editMode
                            ? <div className="save-cancel">
                                <div title="Save changes." className="save" onClick={e => {
                                    e.preventDefault()
                                    constructNewExercise()
                                    toggleEditMode()
                                }}>
                                    Save
                                </div>
                                <div title="Cancel." className="cancel" onClick={toggleEditMode}>
                                    Cancel
                                </div>
                            </div>
                            : <span title="Edit this exercise session." className="edit" onClick={toggleEditMode}>
                                Edit
                            </span>
                            }
                        </>
                        :null }
                    </div>
                </div>
            </section>
        )
    }

    return (
        <>
            <ExerciseVerify />
        </>
    )
}