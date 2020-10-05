import React, { useState, useContext, useEffect, useRef } from "react"
import { ExerciseGoalContext } from "./ExerciseGoalProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
import { FrequencyContext } from "../goals/FrequencyProvider"
import { DateContext } from "../time/DateProvider"
import "./ExerciseGoal.css"

export const WeeklyExerciseGoalTime = (props) => {
  // useContext
  const { measurementTypes } = useContext(MeasurementTypeContext)
  const { frequencies } = useContext(FrequencyContext)
  const { weekArray } = useContext(DateContext)

  const thisDay = new Date()
  const todayLocal = new Date().toLocaleDateString('en-US', {timeZone: "America/Chicago"})
  const thisTimestamp = Date.now(thisDay)
  const thisDayOfTheWeekInt = thisDay.getDay()
  const today = Date.now()
  const todayDate = new Date(today)
  const todayDay = todayDate.getDay()
  const dayToday = weekArray[todayDay]
  useEffect(()=>{
    const frequency = frequencies.find(f => f.id === props.playerExerciseGoal.frequencyId) || {}
    const freq = frequency.each

    const meas = measurementTypes.find(mt => mt.id === props.playerExerciseGoal.measurementTypeId) || {}
    const measure = meas.measurement
    const plural = meas.plural

    const goal = parseInt(props.playerExerciseGoal.goalSet)
    if(goal <= 1){
      setMeasurement(measure)
    }
    else {
      setMeasurement(plural)
    }
    setGoal(goal)
    setFrequency(freq)
  }, [props.playerExerciseGoal])


//STATE
  const [sunArray, setSunArray] = useState([])
  const [monArray, setMonArray] = useState([])
  const [tuesArray, setTuesArray] = useState([])
  const [wedArray, setWedArray] = useState([])
  const [thursArray, setThursArray] = useState([])
  const [friArray, setFriArray] = useState([])
  const [satArray, setSatArray] = useState([])

  const [sunday, setSunday] = useState({})
  const [monday, setMonday] = useState({})
  const [tuesday, setTuesday] = useState({})
  const [wednesday, setWednesday] = useState({})
  const [thursday, setThursday] = useState({})
  const [friday, setFriday] = useState({})
  const [saturday, setSaturday] = useState({})
/* set array length for goals with measurement TIMES frequency DAY */
  const [sundayLength, setSundayLength] = useState(0)
  const [mondayLength, setMondayLength] = useState(0)
  const [tuesdayLength, setTuesdayLength] = useState(0)
  const [wednesdayLength, setWednesdayLength] = useState(0)
  const [thursdayLength, setThursdayLength] = useState(0)
  const [fridayLength, setFridayLength] = useState(0)
  const [saturdayLength, setSaturdayLength] = useState(0)
/* set array lenth for goals with measurement TIMES frequency WEEK */
  const [weekLength, setWeekLength] = useState(0)
/* */
  const [goal, setGoal] = useState(0)
  const [frequency, setFrequency] = useState("")
  const [measurement, setMeasurement] = useState("")

//WEEK
  const thisDayMinusOne = thisTimestamp - 1 * 24 * 60 * 60 * 1000
  const minusOne = new Date(thisDayMinusOne).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

  const thisDayPlusOne = thisTimestamp + 1 * 24 * 60 * 60 * 1000
  const plusOne = new Date(thisDayPlusOne).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

  const thisDayMinusTwo = thisTimestamp - 2 * 24 * 60 * 60 * 1000
  const minusTwo = new Date(thisDayMinusTwo).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

  const thisDayPlusTwo = thisTimestamp + 2 * 24 * 60 * 60 * 1000
  const plusTwo = new Date(thisDayPlusTwo).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

  const thisDayMinusThree = thisTimestamp - 3 * 24 * 60 * 60 * 1000
  const minusThree = new Date(thisDayMinusThree).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

  const thisDayPlusThree = thisTimestamp + 3 * 24 * 60 * 60 * 1000
  const plusThree = new Date(thisDayPlusThree).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

  const thisDayMinusFour = thisTimestamp - 4 * 24 * 60 * 60 * 1000
  const minusFour = new Date(thisDayMinusFour).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

  const thisDayPlusFour = thisTimestamp + 4 * 24 * 60 * 60 * 1000
  const plusFour = new Date(thisDayPlusFour).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

  const thisDayMinusFive = thisTimestamp - 5 * 24 * 60 * 60 * 1000
  const minusFive = new Date(thisDayMinusFive).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

  const thisDayPlusFive = thisTimestamp + 5 * 24 * 60 * 60 * 1000
  const plusFive = new Date(thisDayPlusFive).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

  const thisDayMinusSix = thisTimestamp - 6 * 24 * 60 * 60 * 1000
  const minusSix = new Date(thisDayMinusSix).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

  const thisDayPlusSix = thisTimestamp + 6 * 24 * 60 * 60 * 1000
  const plusSix = new Date(thisDayPlusSix).toLocaleDateString('en-US', {timeZone: "America/Chicago"})

//EFFECT
  useEffect(()=>{
    if(thisDayOfTheWeekInt === 0) {
      setSunday(todayLocal)
      setMonday(plusOne)
      setTuesday(plusTwo)
      setWednesday(plusThree)
      setThursday(plusFour)
      setFriday(plusFive)
      setSaturday(plusSix)
    }
    if(thisDayOfTheWeekInt === 1) {
      setSunday(minusOne)
      setMonday(todayLocal)
      setTuesday(plusOne)
      setWednesday(plusTwo)
      setThursday(plusThree)
      setFriday(plusFour)
      setSaturday(plusFive)
    }
    if(thisDayOfTheWeekInt === 2) {
      setSunday(minusTwo)
      setMonday(minusOne)
      setTuesday(todayLocal)
      setWednesday(plusOne)
      setThursday(plusTwo)
      setFriday(plusThree)
      setSaturday(plusFour)
    }
    if(thisDayOfTheWeekInt === 3) {
      setSunday(minusThree)
      setMonday(minusTwo)
      setTuesday(minusOne)
      setWednesday(todayLocal)
      setThursday(plusOne)
      setFriday(plusTwo)
      setSaturday(plusThree)
    }
    if(thisDayOfTheWeekInt === 4) {
      setSunday(minusFour)
      setMonday(minusThree)
      setTuesday(minusTwo)
      setWednesday(minusOne)
      setThursday(todayLocal)
      setFriday(plusOne)
      setSaturday(plusTwo)
    }
    if(thisDayOfTheWeekInt === 5) {
      setSunday(minusFive)
      setMonday(minusFour)
      setTuesday(minusThree)
      setWednesday(minusTwo)
      setThursday(minusOne)
      setFriday(todayLocal)
      setSaturday(plusOne)
    }
    if(thisDayOfTheWeekInt === 6) {
      setSunday(minusSix)
      setMonday(minusFive)
      setTuesday(minusFour)
      setWednesday(minusThree)
      setThursday(minusTwo)
      setFriday(minusOne)
      setSaturday(todayLocal)
    }
  }, [])

  useEffect(()=>{
    const sunArray = props.playerExercises.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date === sunday) {
        return pe
      }})  || []
    const monArray = props.playerExercises.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== monday) {
        return pe
      }})|| []
    const tuesArray = props.playerExercises.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== tuesday){
        return pe
       }}) || []
    const wedArray = props.playerExercises.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== wednesday) {
        return pe
      }}) || []
    const thursArray = props.playerExercises.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== thursday){
        return pe
      }}) || []
    const friArray = props.playerExercises.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== friday) {
        return pe
      }})|| []
    const satArray = props.playerExercises.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== saturday) {
        return pe
      }}) || []

    setSunArray(sunArray)
    setMonArray(monArray)
    setTuesArray(tuesArray)
    setWedArray(wedArray)
    setThursArray(thursArray)
    setFriArray(friArray)
    setSatArray(satArray)

  }, [props.playerExercises])

  useEffect(()=>{
    const totalCount = sunArray.length + monArray.length + tuesArray.length + wedArray.length + thursArray.length + friArray.length + satArray.length
    setWeekLength(totalCount)
  }, [sunArray, monArray, tuesArray, wedArray, thursArray, friArray, satArray] )

  useEffect(()=>{
    const secondsArray = sunArray.map(sun => sun.seconds)
    const minutesArray = sunArray.map(sun => sun.minutes)
    const totalSeconds = props.findSum(secondsArray)
    const totalMinutes = props.findSum(minutesArray)
    const minutesAsSeconds = totalMinutes * 60
    const seconds = minutesAsSeconds % 60
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)
    setSunSeconds(seconds)
    setSunMinutes(minutes)
    setSunHours(hours)

  }, [props.playerExercises, sunArray])

  useEffect(()=>{
    const secondsArray = monArray.map(mon => mon.seconds)
    const minutesArray = monArray.map(mon => mon.minutes)
    const totalSeconds = props.findSum(secondsArray)
    const totalMinutes = props.findSum(minutesArray)
    const minutesAsSeconds = totalMinutes * 60
    const seconds = minutesAsSeconds % 60
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)

    setMonSeconds(seconds)
    setMonMinutes(minutes)
    setMonHours(hours)

  }, [props.playerExercises, monArray])

  const [sunSeconds, setSunSeconds] = useState(0)
  const [sunMinutes, setSunMinutes] = useState(0)
  const [sunHours, setSunHours] = useState(0)
  const [monSeconds, setMonSeconds] = useState(0)
  const [monMinutes, setMonMinutes] = useState(0)
  const [monHours, setMonHours] = useState(0)
  console.log(sunHours, "sunday hours")
  console.log(sunMinutes, "sunday minutes")
  console.log(sunSeconds, "sunday seconds")
  console.log(monHours, "monday hours")
  console.log(monMinutes, "monday minutes")
  console.log(monSeconds, "monday seconds")
  console.log(props.playerExerciseGoal,"player exercise goal" )
  console.log(weekLength, "week array")

// three
// hours
// week

// days per week
// hours per week
// times per week

// 30 minutes per day
// 1 hour per day
// 3 times per day
  return (
    <>
    <div className="goal-statement">
      Exercise Goal: {goal} {measurement} every {frequency}
    </div>
    <div className="goal-acheived">
      Exercise Achieved:
    </div>
      <div className="chart-container column">

        <div className="heading-container column">
          <div className="heading">
            The Week So Far
          </div>
          <div className="sub-heading">
          </div>
        </div>

        <div className="middle-chunk row">

          <div className="left-margin column">
          </div>

          <div className="week-container graph-background row">

            <div className="day-container">
              <div className="day sunday goal-container column">
                <div className="day sunday achieved-container">
                </div>
              </div>
              <div className="day-label sunday-label row">
                Su
              </div>
            </div>

            <div className="day-container">
              <div className="day monday goal-container column">
                <div className="day monday achieved-container">
                </div>
              </div>
              <div className="day-label monday-label row">
                M
              </div>
            </div>

            <div className="day-container">
              <div className="day tuesday goal-container column">
                <div className="day tuesday achieved-container">
                </div>
              </div>
              <div className="day-label tuesday-label row">
                T
              </div>
            </div>

            <div className="day-container">
              <div className="day wednesday goal-container column">
                <div className="day wednesday achieved-container">
                </div>
              </div>
              <div className="day-label wednesday-label row">
                W
              </div>
            </div>

            <div className="day-container">
              <div className="day thursday goal-container column">
                <div className="day thursday achieved-container">
                </div>
              </div>
              <div className="day-label thursday-label row">
                Th
              </div>
            </div>

            <div className="day-container">
              <div className="day friday goal-container column">
                <div className="day friday achieved-container">
                </div>
              </div>
              <div className="day-label friday-label row">
                F
              </div>
            </div>

            <div className="day-container">
              <div className="day saturday goal-container column">
                <div className="day saturday achieved-container">

                </div>
              </div>
              <div className="day-label saturday-label row">
                Sa
              </div>
            </div>

          </div>
        </div>

        <div className="right-margin column">
        </div>
        <div className="graph-footer column">
          <div className="footer">
          </div>
          <div className="sub-footer">
          </div>
        </div>
      </div>
    </>
  )
}