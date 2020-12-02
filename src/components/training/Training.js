import React, { useContext, useRef, useState, useEffect } from "react"
import { TrainingContext } from "./TrainingProvider"
import { TrainingTypeContext } from "../trainingType/TrainingTypeProvider"
import { PlayerContext } from "../players/PlayerProvider"
import "./Training.css"

export const Training = ( props ) => {
  const userId = parseInt(sessionStorage.getItem("wr__user"))
  //refs
  const trainingType = useRef(null)
  const arrow = useRef(null)
  const note = useRef(null)

  //useContext
  const {  trainingTypes, getTrainingTypes } = useContext(TrainingTypeContext)
  const { removeTraining, editTraining } = useContext(TrainingContext)
//EFFECT
useEffect(()=>{
  getTrainingTypes()
},[])

  const handleControlledInputChange = (e) => {
    const newTraining = Object.assign({}, training)
    newTraining[e.target.name] = e.target.value
    setTraining(newTraining)
  }

  const constructNewTraining = () => {
    const playerId = parseInt(props.training.playerId)
    const trainingTypeId = parseInt(trainingType.current.value)
    const newNote = note.current.value
    const trainingId = parseInt(props.training.id)
    const minutes = parseInt(props.training.minutes)
    const seconds = parseInt(props.training.seconds)
    const treats = parseInt(props.training.treatCount)
    const date = props.training.date
    const timestamp = parseInt(props.training.timestamp)

    const newTrainingObject = {
            id: trainingId,
            playerId: props.playerId,
            startTime: props.training.startTime,
            endTime: props.training.endTime,
            trainingTypeId: trainingTypeId,
            minutes: minutes,
            seconds: seconds,
            treatCount: treats,
            date: date,
            note: newNote,
            timestamp: timestamp
    }
    editTraining(newTrainingObject)
        .then(toggleEditMode())
  }

  //useState
  const [noteHidden, setNoteHidden] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [training, setTraining] = useState({})

  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')

  const { getPlayerByPlayerId } = useContext(PlayerContext)
  const [player, setPlayer] = useState({})

  useEffect(()=>{
    const playerId = parseInt(props.match.params.playerId)
      getPlayerByPlayerId(playerId)
  }, [])

  const toggleHidden = () => {
    if (noteHidden === true) {
      setNoteHidden(false)
    }
    else {
      setNoteHidden(true)
    }
  }

  const toggleEditMode = () => {
      setEditMode(!editMode)
  }

  const TrainingVerify = () => {
      return (
        <>
            <section className="tr-card">
              <div className="tr-card--details">
                <div className="tr-card--detail tr-card--date">
                    {editMode
                    ?<>
                    <select
                    defaultValue={props.training.trainingTypeId}
                    name="Type"
                    ref={trainingType}
                    id="trainingType"
                    className="select select--edit-tr"
                    onChange={handleControlledInputChange}>
                        <option value="0"></option>
                        {trainingTypes.map(tt => (
                        <option key={tt.id} value={tt.id}>
                            {tt.type}
                        </option>
                        ))}
                    </select>
                    </>
                    : <div className="behavior">
                        {props.trainingType.type}
                    </div>
                    }
                    <div className="date">

                        {props.training.date}
                    </div>
                    {editMode
                    ? <div title="Delete this training session." className="delete-training-button" onClick={() => {
                        removeTraining(props.training.id)
                    }}></div>
                    : <div ref={arrow} className="arrow" onClick={toggleHidden}>
                        <img className="down-arrow down-arrow-img" src={noteHidden ? "https://res.cloudinary.com/heymonicakay/image/upload/a_90/v1601408603/wideRetriever/FB962FED-6991-4FCE-8D65-1A3A33211BA9_rnqjrl.png" : "https://res.cloudinary.com/heymonicakay/image/upload/a_270/v1601408603/wideRetriever/FB962FED-6991-4FCE-8D65-1A3A33211BA9_rnqjrl.png" } alt=""/>
                    </div>
                    }
                </div>
                <div className={`tr-card--stats ${noteHidden ? "hide" : "show"}`}>
                    <div className="start-and-end-time">
                        <div className="tr-card--detail tr-card--duration">
                            {props.training.startTime} - {props.training.endTime}
                        </div>
                    </div>
                    <div className="tr-card--detail tr-card--treat-count">
                        Treat Count: {props.training.treatCount}
                    </div>

                    {editMode
                    ? <textarea
                    defaultValue={props.training.note}
                    ref={note}
                    name="note"
                    className="input input--edit-note-tr"
                    onChange={handleControlledInputChange} />
                    : <div className="tr-card-note">
                        {props.training.note}
                    </div>
                    }

                    {props.isOwner
                    ?<>
                        {editMode
                        ? <>
                        <div className="save-cancel">
                            <div title="Save changes." className="save" onClick={e => {
                                e.preventDefault()
                                constructNewTraining()
                                toggleEditMode()
                            }}>
                                Save
                            </div>
                            <div title="Cancel." className="cancel" onClick={toggleEditMode}>
                                Cancel
                            </div>
                        </div>
                        </>
                        : <span title="Edit this training session." className="edit" onClick={toggleEditMode}>
                            Edit
                        </span>
                        }
                    </>
                    :<>
                    </>}
                </div>
              </div>
            </section>
        </>
      )
  }
  return (
    <>
      {TrainingVerify()}
    </>
  )
}
