import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { TrainingContext } from "./TrainingProvider"
import { TrainingTypeContext } from "../trainingType/TrainingTypeProvider"
import { TrainingTypeForm } from "../trainingType/TrainingTypeForm"
import { TrainingStopwatch } from "../time/TrainingStopwatch"

import "./TrainingForm.css"

export const TrainingForm = (props) => {
// REF
  const duration = useRef(null)
  const trainingType = useRef(null)
  const note = useRef(null)
  const { addTraining } = useContext(TrainingContext)
  const { trainingTypes, getTrainingTypes } = useContext(TrainingTypeContext)
  const { getPlayerByPlayerId } = useContext(PlayerContext)
  const playerId = parseInt(props.match.params.playerId)
//EFFECT
  useEffect(() => {
    getPlayerByPlayerId(playerId)
    getTrainingTypes()
  }, [])

//STATE
  const[animate, setAnimate]=useState(false)
  const [training, setTraining] = useState({})
  const [player, setPlayer] = useState({})
  const [edit, setEdit] = useState(false)
  const [intSecond, setIntSecond] = useState(0)
  const [intMinute, setIntMinute] = useState(0)
  const [trTypeSelected, setTrTypeSelected] = useState("")
  const [trTypeSelectedLower, setTrTypeSelectedLower] = useState("")
  const [stepOne, setStepOne] = useState(false)
  const [stepTwo, setStepTwo] = useState(true)
  const [stepThree, setStepThree] = useState(true)
  const [alertOne, setAlertOne] = useState(false)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [isReady, setIsReady] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [treatCount ,setTreatCount] = useState(0)

//DATES
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')
  const current = new Date()
  const currentTime = current.toLocaleTimeString('en-US', {timeStyle: "short"})
  const weekDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  const day = current.getDay()
  const date = current.getDate()
  const dayOfTheWeek = weekDays[day]
  const months = ["jan", "feb", "march", "april", "may", "june", "july", "aug", "sept", "oct", "nov", "dec"]
  const month = current.getMonth()
  const thisMonth = months[month]
  const year = current.getFullYear()

//HANDLE
  const FlyingDiv = ({ title="Let's go\!", isHidden }) => {
  const visibilityClasses = { hidden: 'hidden', visible: 'visible'}
  const animationClasses = { goRight: 'lets-go', fadeIn: 'fade-in'}
  const [animationClass, setAnimationClass] = useState(animationClasses.fadeIn)
  const [divHiddenClass, setDivHiddenClass] = useState(visibilityClasses.visible)

  useEffect(()=>{
    let hiddenClassTimer = null

    if (isHidden === false) {
      setAnimationClass(animationClasses.goRight)
      hiddenClassTimer = setTimeout(()=>{
        setDivHiddenClass(visibilityClasses.hidden)}, 2800)}
    else {
      setAnimationClass(animationClasses.fadeIn)
      setDivHiddenClass(visibilityClasses.visible)
    }
    return()=> {
      clearTimeout(hiddenClassTimer)
    }}, [isHidden])
    return (
      <div className={`div ${animationClass} ${divHiddenClass}`}>
        <p>{title}</p>
      </div>
    )
}

    const handleClickStepOne = () => {
      if(trainingType.current.value === "0") {
        setAlertOne(true)
      }
      else {
        setAlertOne(false)
        setStepOne(true)
        setStepTwo(false)
        setStepThree(true)
      }
    }

    const handleTreatIncrement = () => {
      setTreatCount(preTreatCount => preTreatCount + 1);
      setAnimate(true)
    };

    const handleTTChange = (e) => {
      if(e.target.value !== "0"){
        const trTypeSelected = trainingTypes.find(tr => parseInt(e.target.value) === tr.id).type
        const trTypeSelectedLower = trTypeSelected.toLowerCase()
        setTrTypeSelected(trTypeSelected)
        setTrTypeSelectedLower(trTypeSelectedLower)
        setIsReady(true)
        setIsHidden(!isHidden)
      }
      else if(e.target.value === "0") {
        setIsReady(false)
      }
    }

    const handleControlledInputChange = (e) => {
    const newTraining = Object.assign({}, training)
    newTraining[e.target.name] = e.target.value
    setTraining(newTraining)
  }

  const constructNewTraining = () => {
    const trainingTypeId = parseInt(trainingType.current.value)
    {addTraining({
      playerId,
      trainingTypeId,
      startTime: startTime,
      endTime: endTime,
      minutes: intMinute,
      seconds: intSecond,
      treatCount: treatCount,
      date: today,
      note: training.note,
      timestamp: todayTimestamp
    })
      .then(() => props.history.push(`/players/${playerId}`))}
  }

  const toggleEdit = () =>{
    if(edit === false){
      setEdit(true)
    }
    else {
      setEdit(false)
    }
  }

  return (
    <div className="cont--form-ex">
      <section className="form">
        <section className={`steps ${stepOne ? "hidden" : "visible"}`}>
        <h1
          className="h1 header__form header__form--ex">
            {player.name}
        </h1>
          <div className="moving">
            <div className="get-moving">
            {isReady
            ? "Great choice!"
            : "Choose a behavior to get started..."
            }
            </div>
          </div>
          <div className="instructions">
            <div className={`instructions-step-one ${alertOne ? "visible" : "hidden"}`}>
              {alertOne ? 'Woah! Pick a behavior first!' : <></>}
            </div>
            <select defaultValue="" name="trainingType" ref={trainingType} id="trainingType" className="select select--et"
              onChange={(e) => {
                setAlertOne(false)
                handleTTChange(e)
                handleControlledInputChange(e)}}>
              <option className="first-option" value="0">
                  Select an behavior...
              </option>
                {trainingTypes.map(tr => (
                  <option key={tr.id} value={tr.id}>
                      {tr.type}
                  </option>
                ))}
            </select>
            <div className="custom-cont">
              <span className="add-ex-type" onClick={toggleEdit}>
                  Custom
              </span>
            </div>
          </div>
          <div className="input-ex-type-placeholder">
            {edit
              ? <TrainingTypeForm toggleEdit={toggleEdit} {...props}/> : <> </>
            }
          </div>
          <div className="lets-go-cont">
            {isReady
              ? <FlyingDiv
                isHidden={isHidden}
                {...props}/>
              : <></>
            }
          </div>
          <div className="jiggle-container">
            <span className="jiggle-wrapper" onClick={()=> handleClickStepOne()}>
              <img className={`next ${isReady ? "jiggle" : ""}`} src="https://res.cloudinary.com/heymonicakay/image/upload/v1601408603/wideRetriever/FB962FED-6991-4FCE-8D65-1A3A33211BA9_rnqjrl.png" alt="" />
            </span>
          </div>
        </section>

      <section className={`steps ${stepTwo ? "hidden" : "visible"}`}>
      <div className="treat-tracker">
        <div className={`treat-tracker-wrapper ${animate ? "spin": ""}`} onClick={handleTreatIncrement}>
          <img src="https://res.cloudinary.com/heymonicakay/image/upload/v1601928894/wideRetriever/D4B12069-F278-4A4B-AC71-C07F365695CD_tcaj1f.png" className="treat-tracker-img" />
        </div>
        <div className="treat-count" >
          Treat
          <br />
          Tracker
          <br />
        {treatCount}
        </div>
      </div>

        <div className="stopwatch">
          <TrainingStopwatch
            setStepThree={setStepThree}
            setStepTwo={setStepTwo}
            setStepOne={setStepOne}
            setIntSecond={setIntSecond}
            setIntMinute={setIntMinute}
            intMinute={intMinute}
            currentTime={currentTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            exTypeSelectedLower={trTypeSelectedLower}
            {...props} />
        </div>
      </section>

      <section className={`steps ${stepThree ? "hidden" : "visible"}`}>
        <div className="ex-msg">
          <div className="great-job">
            Great job!
          </div>
          <div className="summary">
            Summary
          </div>
          <p>
            Behavior: {trTypeSelected}
          </p>
          <p>
            Start Time: {startTime}
          </p>
          <p>
            End Time: {endTime}
          </p>
          <p>
            Total Training Time: {intMinute}min {intSecond}s
          </p>
          <p>
            Total Treats: {treatCount}
          </p>
        </div>
        <div className="note-section">

          <label className="note-label">Add a note about today's training...</label>
          <textarea
            ref={note}
            name="note"
            className="input input--note-ex"
            onChange={handleControlledInputChange} />

          <button
            className="btn btn--submit btn--ex"
            type="button"
            onClick={e => {
              e.preventDefault()
              constructNewTraining()
            }}>
              Save Training Session
          </button>
          <div className="discard" onClick={()=>props.history.push(`/players/${playerId}`)}>
            Discard Training Session
          </div>
        </div>

        </section>

      </section>

        <div className="prog-bar-cont">
          <div className="ex-form-prog">
            <div className={`prog-bar ${stepOne ? "" : "current"}`}></div>
            <div className={`prog-bar ${stepTwo ? "" : "current"}`}></div>
            <div className={`prog-bar ${stepThree ? "" : "current"}`}></div>
          </div>
        </div>

    </div>
  );
}