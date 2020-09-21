import React, { useContext, useRef, useState, useEffect } from "react"
import { TrainingContext } from "./TrainingProvider"
import { TrainingTypeContext } from "../trainingType/TrainingTypeProvider"
import { PlayerContext } from "../players/PlayerProvider"
import "./Training.css"

export const Training = ( props ) => {

  //define user id
  const userId = parseInt(sessionStorage.getItem("wr__user"))

  //refs
  const duration = useRef(null)
  const trainingType = useRef(null)
  const note = useRef(null)

  //useContext
  const {  trainingTypes, getTrainingTypes } = useContext(TrainingTypeContext)
  const { removeTraining, editTraining } = useContext(TrainingContext)

  //useEffect
  useEffect(() => {
    getTrainingTypes()
  })

  // func to build new training obj on input change
  const handleControlledInputChange = (e) => {
    const newTraining = Object.assign({}, training)

    newTraining[e.target.name] = e.target.value

    setTraining(newTraining)
  }

  const constructNewTraining = () => {
    //define player ID
    const playerId = parseInt(props.training.playerId)

    //define trainingTypeId
    const trainingTypeId = parseInt(trainingType.current.value)

    //define trainingId
    const trainingId = parseInt(props.training.id)

    {editTraining({
      id: props.training.id,
      playerId,
      trainingTypeId,
      duration: training.duration,
      date: today,
      note: training.note,
    })
    .then(() => props.history.push(`/players/${playerId}`))}
  }

  //useState
  const [noteHidden, setNoteHidden] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [training, setTraining] = useState([])

  //translate alien timestamp into human date
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')

  //exposing functionality to get an set player
  const { getPlayerById } = useContext(PlayerContext)
  const [player, setPlayer] = useState({})

  //useEffect
  useEffect(()=>{
    const playerId = parseInt(props.match.params.playerId)
      getPlayerById(playerId)
        .then(setPlayer)
  }, [])

  //toggle whether the training note is hidden or not
  const toggleHidden = () => {
    if (noteHidden === true) {
      setNoteHidden(false)
    }
    else {
      setNoteHidden(true)
    }
  }

  //toggles edit mode for individual training session
  const toggleEditMode = () => {
    if (editMode === true) {
      setEditMode(false)
    }
    else {
      setEditMode(true)
    }
  }

  //verifies user and displays player's training data accordingly
  const TrainingVerify = () => {
    if(userId === player.userId) {
      return (
        <>
        {editMode
          ?
          <>
            <div className="cont--form-edit-tr">
              <select ref={duration} name="duration" className="input input--tr-edit input--duration" defaultValue={props.training.duration} onChange={handleControlledInputChange}>
                <option value="0">How long did you train?</option>
                <option value="5 min">5 min</option>
                <option value="10 min">10 min</option>
                <option value="15 min">15 min</option>
                <option value="20 min">20 min</option>
                <option value="25 min">25 min</option>
                <option value="30 min">30 min</option>
              </select>

              <select defaultValue={props.exercise.trainingTypeId} name="Type" ref={trainingType} id="trainingType" className="select select--tr" onChange=
                {handleControlledInputChange}>
                  <option value="0">Select an behavior</option>
                    {trainingTypes.map(tt => (
                      <option key={tt.id} value={tt.id}>
                        {tt.type}
                      </option>
                    ))}
              </select>

              <label htmlfor="note">How did {player.name} do?</label>

              <textarea defaultValue={props.exercise.note} ref={note} name="note" className="input input--note-ex" onChange={handleControlledInputChange} />

              <button className="btn btn--submit btn--ex" type="button"
                onClick={e => {
                  e.preventDefault()
                  constructNewTraining()
                  toggleEditMode()
                }}>
                  Save Changes
              </button>
            </div>
          </>
          :
            <section className="tr-card">
              <div className="tr-card--details" onClick={()=>{
                  toggleHidden()
              }}>
                <span className="tr-card--detail tr-card--date">
                  {props.training.date}
                </span>
                <div className="tr-card--stats">
                  <span className="tr-card--detail tr-card--duration">
                    {props.training.duration}
                  </span>
                  <span className="tr-card--detail tr-card--type">
                    {props.trainingType.type}
                  </span>
                </div>
                <div className="tr-card--detail tr-card--note">
                  {noteHidden
                    ? <span hidden></span>
                    : <>
                        <span className="note">
                          {props.training.note}
                        </span>
                        <span className="edit" onClick={()=>{
                          toggleEditMode()}}>
                            Edit
                        </span>
                        <button className="btn btn--circle btn--red btn--del" onClick={() => {
                          removeTraining(props.training.id)}}>
                            X
                          </button>
                        </>
                    }
                </div>
              </div>
            </section>
          }
        </>
      )
    }
    else {
      return (
        <>
          {editMode
            ?
            <>
              <div className="cont--form-edit-tr">
                <select ref={duration} name="duration" className="input input--tr-edit input--duration" defaultValue={props.training.duration} onChange={handleControlledInputChange}>
                  <option value="0">How long did you train?</option>
                  <option value="5 min">5 min</option>
                  <option value="10 min">10 min</option>
                  <option value="15 min">15 min</option>
                  <option value="20 min">20 min</option>
                  <option value="25 min">25 min</option>
                  <option value="30 min">30 min</option>
                </select>

                <select defaultValue={props.training.trainingTypeId} name="trainingType" ref={trainingType} id="trainingType" className="select select--tr" onChange={handleControlledInputChange}>
                  <option value="0">Select a behavior</option>
                    {trainingTypes.map(tt => (
                      <option key={tt.id} value={tt.id}>
                        {tt.type}
                      </option>
                    ))}
                </select>

                <label htmlfor="note">How did {player.name} do?</label>

                <textarea defaultValue={props.training.note} ref={note} name="note" className="input input--note-tr" onChange={handleControlledInputChange} />

                <button className="btn btn--submit btn--tr" type="button"
                  onClick={e => {
                    e.preventDefault()
                    constructNewTraining()
                    toggleEditMode()
                  }}>
                    Save Changes
                </button>
              </div>
            </>
            :
            <>
              <section className="tr-card">
                <div className="tr-card--details" onClick={()=>{
                  toggleHidden()
                }}>
                  <span className="tr-card--detail tr-card--date">
                    {props.training.date}
                  </span>
                  <div className="tr-card--stats">
                    <div className="tr-card--detail tr-card--catches">
                      {props.training.duration}
                    </div>
                    <span className="tr-card--detail tr-card--misses">
                      {props.trainingType.type}
                    </span>
                  </div>
                  <div className="tr-card--detail tr-card--note">
                      {noteHidden
                        ? <span hidden></span>
                        : <>
                            <span className="note">
                              {props.training.note}
                            </span>
                          </>
                      }
                  </div>
                </div>
              </section>
            </>
          }
        </>
      )
    }
  }
  return (
    <>
      {TrainingVerify()}
    </>
  )
}
