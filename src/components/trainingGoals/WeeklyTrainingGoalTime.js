import React, { useState, useContext, useEffect, useRef } from "react"
import { TrainingGoalContext } from "./TrainingGoalProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
import { FrequencyContext } from "../goals/FrequencyProvider"
import { DateContext } from "../time/DateProvider"
import "./TrainingGoal.css"

export const WeeklyTrainingGoalTime = (props) => {

  // useContext
  const { measurementTypes } = useContext(MeasurementTypeContext)
  const { frequencies } = useContext(FrequencyContext)
  const { weekArray } = useContext(DateContext)
  const { patchTrainingGoal, getTrainingGoals } = useContext(TrainingGoalContext)
  const thisDay = new Date()
  const todayLocal = new Date().toLocaleDateString('en-US', {timeZone: "America/Chicago"})
  const thisTimestamp = Date.now(thisDay)
  const thisDayOfTheWeekInt = thisDay.getDay()
  const today = Date.now()
  const todayDate = new Date(today)
  const todayDay = todayDate.getDay()
  const dayToday = weekArray[todayDay]

//STATE
/* set array for each day of CURRENT week */
  const [sunArray, setSunArray] = useState([])
  const [monArray, setMonArray] = useState([])
  const [tuesArray, setTuesArray] = useState([])
  const [wedArray, setWedArray] = useState([])
  const [thursArray, setThursArray] = useState([])
  const [friArray, setFriArray] = useState([])
  const [satArray, setSatArray] = useState([])
/* set local date of each day of CURRENT week */
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
/* set array lentgh for goals with measurement TIMES frequency WEEK */
  const [weekLength, setWeekLength] = useState(0)
/* */
  const [goal, setGoal] = useState(0)
  const [dailyGoalInSeconds, setDailyGoalInSeconds] = useState(0)
  const [weeklyGoalInSeconds, setWeeklyGoalInSeconds] = useState(0)
  const [frequency, setFrequency] = useState("")
  const [measurement, setMeasurement] = useState("")
/* set secs for each day in CURRENT week */
  const [sunSeconds, setSunSeconds] = useState(0)
  const [monSeconds, setMonSeconds] = useState(0)
  const [tuesSeconds, setTuesSeconds] = useState(0)
  const [wedSeconds, setWedSeconds] = useState(0)
  const [thursSeconds, setThursSeconds] = useState(0)
  const [friSeconds, setFriSeconds] = useState(0)
  const [satSeconds, setSatSeconds] = useState(0)
/* set active time in secs for each day in CURRENT*/
  const [sunMinutesAsSeconds, setSunMinutesAsSeconds] = useState(0)
  const [monMinutesAsSeconds, setMonMinutesAsSeconds] = useState(0)
  const [tuesMinutesAsSeconds, setTuesMinutesAsSeconds] = useState(0)
  const [wedMinutesAsSeconds, setWedMinutesAsSeconds] = useState(0)
  const [thursMinutesAsSeconds, setThursMinutesAsSeconds] = useState(0)
  const [friMinutesAsSeconds, setFriMinutesAsSeconds] = useState(0)
  const [satMinutesAsSeconds, setSatMinutesAsSeconds] = useState(0)
/* set mins for each day in CURRENT week */
  const [sunMinutes, setSunMinutes] = useState(0)
  const [monMinutes, setMonMinutes] = useState(0)
  const [tuesMinutes, setTuesMinutes] = useState(0)
  const [wedMinutes, setWedMinutes] = useState(0)
  const [thursMinutes, setThursMinutes] = useState(0)
  const [friMinutes, setFriMinutes] = useState(0)
  const [satMinutes, setSatMinutes] = useState(0)
/* set hours for each day in CURRENT week */
  const [sunHours, setSunHours] = useState(0)
  const [monHours, setMonHours] = useState(0)
  const [tuesHours, setTuesHours] = useState(0)
  const [wedHours, setWedHours] = useState(0)
  const [thursHours, setThursHours] = useState(0)
  const [friHours, setFriHours] = useState(0)
  const [satHours, setSatHours] = useState(0)

// THIS WEEK
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
/* sets dates for currrent */
  useEffect(()=>{
    const sunArray = props.playerTrainings.filter(pt => {
      const date = new Date(pt.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date === sunday) {
        return pt
      }})  || []
    const monArray = props.playerTrainings.filter(pt => {
      const date = new Date(pt.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== monday) {
        return pt
      }})|| []
    const tuesArray = props.playerTrainings.filter(pt => {
      const date = new Date(pt.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== tuesday){
        return pt
      }}) || []
    const wedArray = props.playerTrainings.filter(pt => {
      const date = new Date(pt.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== wednesday) {
        return pt
      }}) || []
    const thursArray = props.playerTrainings.filter(pt => {
      const date = new Date(pt.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== thursday){
        return pt
      }}) || []
    const friArray = props.playerTrainings.filter(pt => {
      const date = new Date(pt.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== friday) {
        return pt
      }})|| []
    const satArray = props.playerTrainings.filter(pt => {
      const date = new Date(pt.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== saturday) {
        return pt
      }}) || []

    setSunArray(sunArray)
    setMonArray(monArray)
    setTuesArray(tuesArray)
    setWedArray(wedArray)
    setThursArray(thursArray)
    setFriArray(friArray)
    setSatArray(satArray)

  }, [props.playerTrainings])

  useEffect(()=>{
    setSundayLength(sunArray.length)
    setMondayLength(monArray.length)
    setTuesdayLength(tuesArray.length)
    setWednesdayLength(wedArray.length)
    setThursdayLength(thursArray.length)
    setFridayLength(friArray.length)
    setSaturdayLength(satArray.length)
    const totalCount = sunArray.length + monArray.length + tuesArray.length + wedArray.length + thursArray.length + friArray.length + satArray.length
    setWeekLength(totalCount)
  }, [sunArray, monArray, tuesArray, wedArray, thursArray, friArray, satArray] )

  useEffect(()=>{
    const secondsArray = sunArray.map(sun => sun.seconds)
    const minutesArray = sunArray.map(sun => sun.minutes)
    const totalSeconds = props.findSum(secondsArray)
    const totalMinutes = props.findSum(minutesArray)
    const minutesAsSeconds = (totalMinutes * 60) + totalSeconds
    const seconds = minutesAsSeconds % 60
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)
    setSunSeconds(seconds)
    setSunMinutes(minutes)
    setSunHours(hours)
    setSunMinutesAsSeconds(minutesAsSeconds)

  }, [props.playerTrainings, sunArray])

  useEffect(()=>{
    const secondsArray = monArray.map(mon => mon.seconds)
    const minutesArray = monArray.map(mon => mon.minutes)
    const totalSeconds = props.findSum(secondsArray)
    const totalMinutes = props.findSum(minutesArray)
    const minutesAsSeconds = (totalMinutes * 60) + totalSeconds
    const seconds = minutesAsSeconds % 60
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)
    setMonSeconds(seconds)
    setMonMinutes(minutes)
    setMonHours(hours)
    setMonMinutesAsSeconds(minutesAsSeconds)

  }, [props.playerTrainings, monArray])

  useEffect(()=>{
    const secondsArray = tuesArray.map(tues => tues.seconds)
    const minutesArray = tuesArray.map(tues => tues.minutes)
    const totalSeconds = props.findSum(secondsArray)
    const totalMinutes = props.findSum(minutesArray)
    const minutesAsSeconds = (totalMinutes * 60) + totalSeconds
    const seconds = minutesAsSeconds % 60
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)
    setTuesSeconds(seconds)
    setTuesMinutes(minutes)
    setTuesHours(hours)
    setTuesMinutesAsSeconds(minutesAsSeconds)

  }, [props.playerTrainings, tuesArray])

  useEffect(()=>{
    const secondsArray = wedArray.map(wed => wed.seconds)
    const minutesArray = wedArray.map(wed => wed.minutes)
    const totalSeconds = props.findSum(secondsArray)
    const totalMinutes = props.findSum(minutesArray)
    const minutesAsSeconds = (totalMinutes * 60) + totalSeconds
    const seconds = minutesAsSeconds % 60
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)
    setWedSeconds(seconds)
    setWedMinutes(minutes)
    setWedHours(hours)
    setWedMinutesAsSeconds(minutesAsSeconds)

  }, [props.playerTrainings, wedArray])

  useEffect(()=>{
    const secondsArray = thursArray.map(thurs => thurs.seconds)
    const minutesArray = thursArray.map(thurs => thurs.minutes)
    const totalSeconds = props.findSum(secondsArray)
    const totalMinutes = props.findSum(minutesArray)
    const minutesAsSeconds = (totalMinutes * 60) + totalSeconds
    const seconds = minutesAsSeconds % 60
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)
    setThursSeconds(seconds)
    setThursMinutes(minutes)
    setThursHours(hours)
    setThursMinutesAsSeconds(minutesAsSeconds)

  }, [props.playerTrainings, thursArray])

  useEffect(()=>{
    const secondsArray = friArray.map(fri => fri.seconds)
    const minutesArray = friArray.map(fri => fri.minutes)
    const totalSeconds = props.findSum(secondsArray)
    const totalMinutes = props.findSum(minutesArray)
    const minutesAsSeconds = (totalMinutes * 60) + totalSeconds
    const seconds = minutesAsSeconds % 60
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)
    setFriSeconds(seconds)
    setFriMinutes(minutes)
    setFriHours(hours)
    setFriMinutesAsSeconds(minutesAsSeconds)
  }, [props.playerTrainings, friArray])

  useEffect(()=>{
    const secondsArray = satArray.map(sat => sat.seconds)
    const minutesArray = satArray.map(sat => sat.minutes)
    const totalSeconds = props.findSum(secondsArray)
    const totalMinutes = props.findSum(minutesArray)
    const minutesAsSeconds = (totalMinutes * 60) + totalSeconds
    const seconds = minutesAsSeconds % 60
    const minutes = totalMinutes % 60
    const hours = Math.floor(totalMinutes / 60)
    setSatSeconds(seconds)
    setSatMinutes(minutes)
    setSatHours(hours)
    setSatMinutesAsSeconds(minutesAsSeconds)
  }, [props.playerTrainings, satArray])

  useEffect(()=>{
    const frequency = frequencies.find(f => f.id === props.playerTrainingGoal.frequencyId) || {}
    const freq = frequency.each

    const meas = measurementTypes.find(mt => mt.id === props.playerTrainingGoal.measurementTypeId) || {}
    const measId = meas.id
    const measure = meas.measurement
    const plural = meas.plural
    const goal = parseInt(props.playerTrainingGoal.goalSet)

    if(measId === 1){
      const goalInSeconds = goal * 60
      setDailyGoalInSeconds(goalInSeconds)
    }
    if(measId === 2){
      const goalInSeconds = goal * 60 * 60
      setDailyGoalInSeconds(goalInSeconds)
    }

    if(goal <= 1){
      setMeasurement(measure)
    }
    else {
      setMeasurement(plural)
    }
    setGoal(goal)
    setFrequency(freq)
  }, [props.playerTrainingGoal])

  useEffect(()=>{
    if(frequency === "day"){
      setWeeklyGoalInSeconds(dailyGoalInSeconds * 7)
    }
    else if(frequency === "week"){
      setWeeklyGoalInSeconds(dailyGoalInSeconds)
    }
  }, [frequency, dailyGoalInSeconds])

  useEffect(()=>{
    const prog = (sunMinutesAsSeconds / dailyGoalInSeconds) * 100
    const sunProg = Math.floor(prog)
    setSundayProgress(sunProg)
  }, [sunMinutesAsSeconds, dailyGoalInSeconds])

  useEffect(()=>{
    const prog = (monMinutesAsSeconds / dailyGoalInSeconds) * 100
    const monProg = Math.floor(prog)
    setMondayProgress(monProg)
  }, [monMinutesAsSeconds, dailyGoalInSeconds])

  useEffect(()=>{
    const prog = (tuesMinutesAsSeconds / dailyGoalInSeconds) * 100
    const tuesProg = Math.floor(prog)
    setTuesdayProgress(tuesProg)
  }, [tuesMinutesAsSeconds, dailyGoalInSeconds])

  useEffect(()=>{
    const prog = (wedMinutesAsSeconds / dailyGoalInSeconds) * 100
    const wedProg = Math.floor(prog)
    setWednesdayProgress(wedProg)
  }, [wedMinutesAsSeconds, dailyGoalInSeconds])

  useEffect(()=>{
    const prog = (thursMinutesAsSeconds / dailyGoalInSeconds) * 100
    const thursProg = Math.floor(prog)
    setThursdayProgress(thursProg)
  }, [thursMinutesAsSeconds, dailyGoalInSeconds])

  useEffect(()=>{
    const prog = (friMinutesAsSeconds / dailyGoalInSeconds) * 100
    const friProg = Math.floor(prog)
    setFridayProgress(friProg)
  }, [friMinutesAsSeconds, dailyGoalInSeconds])

  useEffect(()=>{
    const prog = (satMinutesAsSeconds / dailyGoalInSeconds) * 100
    const satProg = Math.floor(prog)
    setSaturdayProgress(satProg)
  }, [satMinutesAsSeconds, dailyGoalInSeconds])

  useEffect(()=>{
    const seconds = sunMinutesAsSeconds + monMinutesAsSeconds + tuesMinutesAsSeconds + wedMinutesAsSeconds + thursMinutesAsSeconds + friMinutesAsSeconds + satMinutesAsSeconds

    const weekSeconds = seconds % 60
    const minutes = Math.floor(seconds / 60)
    const weekHours = Math.floor(minutes / 60)
    const weekMinutes = minutes % 60

    setWeekInSeconds(seconds)
    setWeeksSeconds(weekSeconds)
    setWeeksHours(weekHours)
    setWeeksMinutes(weekMinutes)

    const prog = (seconds / weeklyGoalInSeconds) * 100
    const weekProg = Math.floor(prog)
    if(weekProg){
        setWeekProgress(weekProg)
    }
    else{
        setWeekProgress(0)
    }

  }, [sunMinutesAsSeconds, monMinutesAsSeconds, tuesMinutesAsSeconds, wedMinutesAsSeconds, thursMinutesAsSeconds, friMinutesAsSeconds, satMinutesAsSeconds, weeklyGoalInSeconds])

  const [weekInSeconds, setWeekInSeconds] = useState(0)
  const [weeksSeconds, setWeeksSeconds] = useState(0)
  const [weeksMinutes, setWeeksMinutes] = useState(0)
  const [weeksHours, setWeeksHours] = useState(0)

  const [sundayProgress, setSundayProgress] = useState(0)
  const [mondayProgress, setMondayProgress] = useState(0)
  const [tuesdayProgress, setTuesdayProgress] = useState(0)
  const [wednesdayProgress, setWednesdayProgress] = useState(0)
  const [thursdayProgress, setThursdayProgress] = useState(0)
  const [fridayProgress, setFridayProgress] = useState(0)
  const [saturdayProgress, setSaturdayProgress] = useState(0)
  const [weekProgress, setWeekProgress] = useState(0)

  const handleGoalDoubleClick = () => {
    setGoalEdit(true)
  }
  const handleGoalKeyPress = (e) => {
    if(e.key === "Enter"){
      {patchTrainingGoal({
        id: props.playerTrainingGoal.id,
        goalSet: parseInt(goalEditInput.current.value)
      })
      .then(getTrainingGoals())
      .then(setGoalEdit(false))
    }
  }}

  const handleMeasureDoubleClick = () => {
    setMeasurementTypeEdit(true)
  }
  const handleMeasureKeyPress = (e)=>{
    if(e.key === "Enter"){
      {patchTrainingGoal({
        id: props.playerTrainingGoal.id,
        measurementTypeId: parseInt(measurementTypeEditInput.current.value)
      })
      .then(getTrainingGoals())
      .then(setMeasurementTypeEdit(false))
    }
    }}
  const [measurementTypeEdit, setMeasurementTypeEdit]=useState(false)
  const [goalEdit, setGoalEdit] = useState(false)
  const goalEditInput = useRef(null)
  const measurementTypeEditInput = useRef(null)

  return (
    <>
    <div className="goal-statement">
      <div className="trainingGoal">
        Training Goal
      </div>
      {goalEdit
      ? <>
      <input type="number" defaultValue={goal} min="0" max="60" ref={goalEditInput} name="goalEditInput" className="input input--ex input--goalSet" onKeyPress={(e) => {
        handleGoalKeyPress(e)
        }} />
        </>
      :<>
        <span className="goal" onDoubleClick={handleGoalDoubleClick}>
          {goal}
        </span>
        </>
      }
      {measurementTypeEdit
      ?<>
      <select defaultValue={measurement} name="measurementType" ref={measurementTypeEditInput} id="measurementTypeEditInput" className="select select--mt" onKeyPress={(e) => {
        handleMeasureKeyPress(e)
        }}>
              {measurementTypes.map(mt => (
                  <option key={mt.id} value={mt.id}>
                      {mt.plural}
                  </option>
              ))}
        </select>
      </>
      :<>
      <span className="measure" onDoubleClick={handleMeasureDoubleClick}>
        {measurement}
      </span>
      </>
      } every {frequency}
    </div>

      <div className="chart-container column">

        <div className="heading-container column">
          <div className="day-container">
          <div className="heading">
          This Week So Far...
          </div>
          <div className="goal-acheived">
            {weeksHours}h {weeksMinutes}m {weeksSeconds}s
          </div>
              <div className="day week goal-container-week column" style={{width: "90%"}}>
                <div className="day week achieved-container-week" style={{width: `${weekProgress}%`}}>
                    <span className="percent-text-week">
                        {weekProgress}%
                            </span>
                </div>
              </div>
        </div>

        </div>

        <div className="middle-chunk row">
          <div className="left-margin column"></div>
          <div className="week-container graph-background row">
            <div className="day-container">
              <div className="day sunday goal-container column" style={{height: "100px"}}>
                <div className="day sunday achieved percent"></div>
                <div className="day sunday achieved-container" style={{height: `${sundayProgress}%`}}>
                {sundayProgress}%
                </div>
              </div>
              <div className="day-label sunday-label row">
                Su
              </div>
            </div>

            <div className="day-container">
              <div className="day monday goal-container column" style={{height: "100px"}}>
                <div className="day monday achieved percent">
                </div>
                <div className="day sunday achieved-container" style={{height: `${mondayProgress}%`}}>
                {mondayProgress}%
                </div>
              </div>
              <div className="day-label monday-label row">
                M
              </div>
            </div>

            <div className="day-container">
              <div className="day tuesday goal-container column" style={{height: "100px"}}>
                <div className="day tuesday achieved percent">
                </div>
                <div className="day sunday achieved-container" style={{height: `${tuesdayProgress}%`}}>
                {tuesdayProgress}%
                </div>
              </div>
              <div className="day-label tuesday-label row">
                T
              </div>
            </div>

            <div className="day-container">
              <div className="day wednesday goal-container column" style={{height: "100px"}}>
                <div className="day wednesday achieved percent">
                </div>
                <div className="day sunday achieved-container" style={{height: `${wednesdayProgress}%`}}>
                {wednesdayProgress}%
                </div>
              </div>
              <div className="day-label wednesday-label row">
                W
              </div>
            </div>

            <div className="day-container">
              <div className="day thursday goal-container column" style={{height: "100px"}}>
                <div className="day thursday achieved percent">
                </div>
                <div className="day sunday achieved-container" style={{height: `${thursdayProgress}%`}}>
                {thursdayProgress}%
                </div>
              </div>
              <div className="day-label thursday-label row">
                Th
              </div>
            </div>

            <div className="day-container">
              <div className="day friday goal-container column" style={{height: "100px"}}>
                <div className="day friday achieved percent">
                </div>
                <div className="day sunday achieved-container" style={{height: `${fridayProgress}%`}}>
                {fridayProgress}%
                </div>
              </div>
              <div className="day-label friday-label row">
                F
              </div>
            </div>

            <div className="day-container">
              <div className="day saturday goal-container column" style={{height: "100px"}}>
                <div className="day saturday achieved percent">
                </div>
                <div className="day sunday achieved-container" style={{height: `${saturdayProgress}%`}}>
                {saturdayProgress}%
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
            {sunday.toLocaleString('en-US')} to {saturday.toLocaleString('en-US')}
          </div>
          <div className="sub-footer">
          </div>
        </div>
      </div>
    </>
  )
}