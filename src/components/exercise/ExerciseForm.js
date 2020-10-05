import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { ExerciseContext } from "./ExerciseProvider"
import { ExerciseTypeForm } from "../exerciseType/ExerciseTypeForm"
import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
import { Stopwatch } from "../time/Stopwatch"

import "./ExerciseForm.css"

export const ExerciseForm = (props) => {
// useRef
  const note = useRef(null)
  const exerciseType = useRef(null)

//useContext
  const { addExercise } = useContext(ExerciseContext)
  const { exerciseTypes, getExerciseTypes } = useContext(ExerciseTypeContext)
  const { measurementTypes, getMeasurementTypes } = useContext(MeasurementTypeContext)
  const { getPlayerByPlayerId } = useContext(PlayerContext)

//useEffect
const playerId = parseInt(props.match.params.playerId)
  useEffect(() => {
    getPlayerByPlayerId(playerId)
    getExerciseTypes()
    getMeasurementTypes()
  }, [])

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

//useState
  const [exercise, setExercise] = useState({})
  const [player, setPlayer] = useState({})
  const [edit, setEdit] = useState(false)
  const [intSecond, setIntSecond] = useState(0)
  const [intMinute, setIntMinute] = useState(0)
  const [exTypeSelected, setExTypeSelected] = useState("")
  const [exTypeSelectedLower, setExTypeSelectedLower] = useState("")
  const [stepOne, setStepOne] = useState(false)
  const [stepTwo, setStepTwo] = useState(true)
  const [stepThree, setStepThree] = useState(true)
  const [alertOne, setAlertOne] = useState(false)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [isReady, setIsReady] = useState(false)
  const [isHidden, setIsHidden] = useState(true)

// dates
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

//event handlers
  const handleClickStepOne = () => {
    if(exerciseType.current.value === "0") {
      setAlertOne(true)
    }
    else {
      setAlertOne(false)
      setStepOne(true)
      setStepTwo(false)
      setStepThree(true)
    }
  }

  const handleETChange = (e) => {
    if(e.target.value !== "0"){
      const exTypeSelected = exerciseTypes.find(et => parseInt(e.target.value) === et.id).type
      const exTypeSelectedLower = exTypeSelected.toLowerCase()
      setExTypeSelected(exTypeSelected)
      setExTypeSelectedLower(exTypeSelectedLower)
      setIsReady(true)
      setIsHidden(!isHidden)
    }
    else if(e.target.value === "0") {
      setIsReady(false)
    }
  }
  const handleControlledInputChange = (e) => {
    const newExercise = Object.assign({}, exercise)
    newExercise[e.target.name] = e.target.value
    setExercise(newExercise)
  }
  const constructNewExercise = () => {
    const playerId = parseInt(props.match.params.playerId)
    {addExercise({
      playerId,
      exerciseTypeId: parseInt(exerciseType.current.value),
      startTime: startTime,
      endTime: endTime,
      minutes: intMinute,
      seconds: intSecond,
      date: today,
      note: exercise.note,
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

//return statement
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
            : "Choose an activity to get started..."
            }
            </div>
          </div>
          <div className="instructions">
            <div className={`instructions-step-one ${alertOne ? "visible" : "hidden"}`}>
              {alertOne ? 'Woah! Pick an activity first!' : <></>}
            </div>
            <select defaultValue="" name="exerciseType" ref={exerciseType} id="exerciseType" className="select select--et"
              onChange={(e) => {
                setAlertOne(false)
                handleETChange(e)
                handleControlledInputChange(e)}}>
              <option className="first-option" value="0">
                  Select an activity...
              </option>
                {exerciseTypes.map(et => (
                  <option key={et.id} value={et.id}>
                      {et.type}
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
              ? <ExerciseTypeForm toggleEdit={toggleEdit} {...props}/> : <> </>
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
        <div className="step-two-header">
          Enjoy your {exTypeSelectedLower}!
        </div>
        <div className="stopwatch">
          <Stopwatch
            setStepThree={setStepThree}
            setStepTwo={setStepTwo}
            setStepOne={setStepOne}
            setIntSecond={setIntSecond}
            setIntMinute={setIntMinute}
            intMinute={intMinute}
            currentTime={currentTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            exTypeSelectedLower={exTypeSelectedLower}
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
            Activity: {exTypeSelected}
          </p>
          <p>
            Start Time: {startTime}
          </p>
          <p>
            End Time: {endTime}
          </p>
          <p>
            Total Active Time: {intMinute}min {intSecond}s
          </p>
        </div>
        <div className="note-section">

          <label className="note-label">Add a note about today's {exTypeSelectedLower}...</label>
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
              constructNewExercise()
            }}>
              Save Exercise Session
          </button>
          <div className="discard" onClick={()=>props.history.push(`/players/${playerId}`)}>
            Discard Exercise Session
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
