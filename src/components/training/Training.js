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
  const date = useRef(null)
  const minutes = useRef(null)
  const treats = useRef(null)

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
    const trainingId = parseInt(props.training.id)

    {editTraining({
      id: props.training.id,
      playerId: props.playerId,
      trainingTypeId,
      minutes: training.minutes,
      seconds: training.seconds,
      treats: training.treats,
      date: training.date,
      note: training.note,
    })
    .then(() => props.history.push(`/players/${playerId}`))}
  }

  //useState
  const [noteHidden, setNoteHidden] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [training, setTraining] = useState([])

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
    if (editMode === true) {
      setEditMode(false)
    }
    else {
      setEditMode(true)
    }
  }

  //verifies user and displays player's training data accordingly
  const TrainingVerify = () => {
    if(userId === props.player.userId) {
      return (
        <>
        {editMode
          ?
          <>
              <select defaultValue={props.training.trainingTypeId} name="Type" ref={trainingType} id="trainingType" className="select select--tr" onChange=
                {handleControlledInputChange}>
                  <option value="0">Select a behavior</option>
                    {trainingTypes.map(tt => (
                      <option key={tt.id} value={tt.id}>
                        {tt.type}
                      </option>
                    ))}
              </select>

              <label htmlfor="note">How did {props.player.name} do?</label>

              <textarea defaultValue={props.training.note} ref={note} name="note" className="input input--note-ex" onChange={handleControlledInputChange} />

              <button className="btn btn--submit btn--ex" type="button"
                onClick={e => {
                  e.preventDefault()
                  constructNewTraining()
                  toggleEditMode()
                }}>
                  Save Changes
              </button>
              <span className="delete-training"
                onClick={() => {
                  removeTraining(props.training.id)}}>
                    Delete
              </span>

          </>
          :
            <section className="tr-card">
              <div className="tr-card--details">
                <span className="tr-card--detail tr-card--date">
                  {props.training.date}
                </span>
                <span className="tr-card--detail tr-card--type">
                    {props.training.treatCount}
                  </span>
                <div className="tr-card--stats">
                  <span className="tr-card--detail tr-card--type">
                    {props.trainingType.type}
                  </span>
                </div>
                <div className="tr-card--detail tr-card--note">
                  {noteHidden
                    ? null
                    : <>
                    <div className="tr-card--detail tr-card--duration">
                    {props.training.startTime}
                    </div>
                    <div className="tr-card--detail tr-card--duration">
                      {props.training.endTime}
                    </div>
                        <span className="note">
                          {props.training.note}
                        </span>
                        <span className="edit" onClick={()=>{
                          toggleEditMode()}}>
                            Edit
                        </span>
                        </>
                    }
                  </div>
                <div ref={arrow} className="down-arrow"
                  onClick={()=>{
                    toggleHidden()
                  }}>
                    <img className="down-arrow down-arrow-img" src={noteHidden ? "https://res.cloudinary.com/heymonicakay/image/upload/a_90/v1601408603/wideRetriever/FB962FED-6991-4FCE-8D65-1A3A33211BA9_rnqjrl.png" : "https://res.cloudinary.com/heymonicakay/image/upload/a_270/v1601408603/wideRetriever/FB962FED-6991-4FCE-8D65-1A3A33211BA9_rnqjrl.png" } alt=""/>
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
                <section className="tr-card">
                  <div className="tr-card--details">
                    <span className="tr-card--detail tr-card--date">
                      {props.training.date}
                    </span>
                    <div className="tr-card--stats">
                      <div className="tr-card--detail">
                        {props.training.duration}
                      </div>
                      <span className="tr-card--detail">
                        {props.trainingType.type}
                      </span>
                    </div>
                    <div className="tr-card--detail tr-card--note">
                      {noteHidden
                        ? null
                        : <>
                            <span className="note">
                              {props.training.note}
                            </span>
                          </>
                      }
                    </div>
                    <div ref={arrow} className="down-arrow"
                      onClick={()=>{
                        toggleHidden()
                    }}>
                      <img className="down-arrow down-arrow-img" src="https://res.cloudinary.com/heymonicakay/image/upload/c_fill,h_15,w_25/v1600727910/wideRetriever/DEAE19D0-DFF7-4B4D-ACC4-59ACB2B62B1D_g75deb.png" alt=""/>
                    </div>
                  </div>
                </section>
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
