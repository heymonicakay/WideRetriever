import React, { useState, useContext, useEffect, useRef } from "react"
import { PlaytimeGoalContext } from "./PlaytimeGoalProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
import { FrequencyContext } from "../goals/FrequencyProvider"
import { DateContext } from "../time/DateProvider"
import "./PlaytimeGoal.css"

export const WeeklyPlaytimeGoalTime = (props) => {
  // useContext
  const { measurementTypes } = useContext(MeasurementTypeContext)
  const { frequencies } = useContext(FrequencyContext)
  const { weekArray } = useContext(DateContext)
  const { patchPlaytimeGoal, getPlaytimeGoals } = useContext(PlaytimeGoalContext)
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
  const [dailyGoal, setDailyGoal] = useState(0)
  const [frequency, setFrequency] = useState("")
  const [measurement, setMeasurement] = useState("")
/* set secs for each day in CURRENT week */
  const [sunCatches, setSunCatches] = useState(0)
  const [monCatches, setMonCatches] = useState(0)
  const [tuesCatches, setTuesCatches] = useState(0)
  const [wedCatches, setWedCatches] = useState(0)
  const [thursCatches, setThursCatches] = useState(0)
  const [friCatches, setFriCatches] = useState(0)
  const [satCatches, setSatCatches] = useState(0)
/* set active time in secs for each day in CURRENT*/
  const [sunTosses, setSunTosses] = useState(0)
  const [monTosses, setMonTosses] = useState(0)
  const [tuesTosses, setTuesTosses] = useState(0)
  const [wedTosses, setWedTosses] = useState(0)
  const [thursTosses, setThursTosses] = useState(0)
  const [friTosses, setFriTosses] = useState(0)
  const [satTosses, setSatTosses] = useState(0)
/* set mins for each day in CURRENT week */
  const [sunMisses, setSunMisses] = useState(0)
  const [monMisses, setMonMisses] = useState(0)
  const [tuesMisses, setTuesMisses] = useState(0)
  const [wedMisses, setWedMisses] = useState(0)
  const [thursMisses, setThursMisses] = useState(0)
  const [friMisses, setFriMisses] = useState(0)
  const [satMisses, setSatMisses] = useState(0)
/* set hours for each day in CURRENT week */
  const [sunPercentage, setSunPercentage] = useState(0)
  const [monPercentage, setMonPercentage] = useState(0)
  const [tuesPercentage, setTuesPercentage] = useState(0)
  const [wedPercentage, setWedPercentage] = useState(0)
  const [thursPercentage, setThursPercentage] = useState(0)
  const [friPercentage, setFriPercentage] = useState(0)
  const [satPercentage, setSatPercentage] = useState(0)
  const [weeklyGoal, setWeeklyGoal] = useState(0)
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
    const sunArray = props.playerPlaytimes.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date === sunday) {
        return pe
      }})  || []
    const monArray = props.playerPlaytimes.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== monday) {
        return pe
      }})|| []
    const tuesArray = props.playerPlaytimes.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== tuesday){
        return pe
      }}) || []
    const wedArray = props.playerPlaytimes.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== wednesday) {
        return pe
      }}) || []
    const thursArray = props.playerPlaytimes.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== thursday){
        return pe
      }}) || []
    const friArray = props.playerPlaytimes.filter(pe => {
      const date = new Date(pe.date).toLocaleDateString('en-US', {timeZone: "America/Chicago"})
      if(date=== friday) {
        return pe
      }})|| []
    const satArray = props.playerPlaytimes.filter(pe => {
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

  }, [props.playerPlaytimes])

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
    const catchesArray = sunArray.map(sun => sun.catches)
    const missesArray = sunArray.map(sun => sun.misses)
    const totalCatches = props.findSum(catchesArray)
    const totalMisses = props.findSum(missesArray)
    const tosses = totalCatches + totalMisses
    const average = totalCatches / tosses
    const percentage = Math.floor(average)
    setSunCatches(totalCatches)
    setSunMisses(totalMisses)
    setSunPercentage(percentage)
    setSunTosses(tosses)

  }, [props.playerPlaytimes, sunArray])

  useEffect(()=>{
    const catchesArray = monArray.map(sun => sun.catches)
    const missesArray = monArray.map(sun => sun.misses)
    const totalCatches = props.findSum(catchesArray)
    const totalMisses = props.findSum(missesArray)
    const tosses = totalCatches + totalMisses
    const average = totalCatches / tosses
    const percentage = Math.floor(average)
    setMonCatches(totalCatches)
    setMonMisses(totalMisses)
    setMonPercentage(percentage)
    setMonTosses(tosses)
  }, [props.playerPlaytimes, monArray])

  useEffect(()=>{
    const catchesArray = tuesArray.map(sun => sun.catches)
    const missesArray = tuesArray.map(sun => sun.misses)
    const totalCatches = props.findSum(catchesArray)
    const totalMisses = props.findSum(missesArray)
    const tosses = totalCatches + totalMisses
    const average = totalCatches / tosses
    const percentage = Math.floor(average)
    setTuesCatches(totalCatches)
    setTuesMisses(totalMisses)
    setTuesPercentage(percentage)
    setTuesTosses(tosses)

  }, [props.playerPlaytimes, tuesArray])
  useEffect(()=>{
    const catchesArray = wedArray.map(sun => sun.catches)
    const missesArray = wedArray.map(sun => sun.misses)
    const totalCatches = props.findSum(catchesArray)
    const totalMisses = props.findSum(missesArray)
    const tosses = totalCatches + totalMisses
    const average = totalCatches / tosses
    const percentage = Math.floor(average)
    setWedCatches(totalCatches)
    setWedMisses(totalMisses)
    setWedPercentage(percentage)
    setWedTosses(tosses)

  }, [props.playerPlaytimes, wedArray])

  useEffect(()=>{
    const catchesArray = thursArray.map(sun => sun.catches)
    const missesArray = thursArray.map(sun => sun.misses)
    const totalCatches = props.findSum(catchesArray)
    const totalMisses = props.findSum(missesArray)
    const tosses = totalCatches + totalMisses
    const average = totalCatches / tosses
    const percentage = Math.floor(average)
    setThursCatches(totalCatches)
    setThursMisses(totalMisses)
    setThursPercentage(percentage)
    setThursTosses(tosses)

  }, [props.playerPlaytimes, thursArray])

  useEffect(()=>{
    const catchesArray = friArray.map(sun => sun.catches)
    const missesArray = friArray.map(sun => sun.misses)
    const totalCatches = props.findSum(catchesArray)
    const totalMisses = props.findSum(missesArray)
    const tosses = totalCatches + totalMisses
    const average = totalCatches / tosses
    const percentage = Math.floor(average)
    setFriCatches(totalCatches)
    setFriMisses(totalMisses)
    setFriPercentage(percentage)
    setFriTosses(tosses)

  }, [props.playerPlaytimes, friArray])

  useEffect(()=>{
    const catchesArray = satArray.map(sun => sun.catches)
    const missesArray = satArray.map(sun => sun.misses)
    const totalCatches = props.findSum(catchesArray)
    const totalMisses = props.findSum(missesArray)
    const tosses = totalCatches + totalMisses
    const average = totalCatches / tosses
    const percentage = Math.floor(average)
    setSatCatches(totalCatches)
    setSatMisses(totalMisses)
    setSatPercentage(percentage)
    setSatTosses(tosses)

  }, [props.playerPlaytimes, satArray])
  useEffect(()=>{
    const frequency = frequencies.find(f => f.id === props.playerPlaytimeGoal.frequencyId) || {}
    const freq = frequency.each
    const meas = measurementTypes.find(mt => mt.id === props.playerPlaytimeGoal.measurementTypeId) || {}
    const measId = meas.id
    const measure = meas.measurement
    const plural = meas.plural
    const goal = parseInt(props.playerPlaytimeGoal.goalSet)

    if(goal <= 1){
      setMeasurement(measure)
    }
    else {
      setMeasurement(plural)
    }
    setGoal(goal)
    setFrequency(freq)
  }, [props.playerPlaytimeGoal])

  useEffect(()=>{
    if(frequency === "day"){
      setDailyGoal(goal)
    }
    else if(frequency === "week"){
      setWeeklyGoal(goal)
    }
  }, [frequency, goal])

  useEffect(()=>{
    const prog = (sundayLength / dailyGoal) * 100
    const sunProg = Math.floor(prog)
    setSundayProgress(sunProg)
  }, [sundayLength, dailyGoal])

  useEffect(()=>{
    const prog = (mondayLength / dailyGoal) * 100
    const monProg = Math.floor(prog)
    setMondayProgress(monProg)
  }, [mondayLength, dailyGoal])

  useEffect(()=>{
    const prog = (tuesdayLength / dailyGoal) * 100
    const tuesProg = Math.floor(prog)
    setTuesdayProgress(tuesProg)
  }, [tuesdayLength, dailyGoal])

  useEffect(()=>{
    const prog = (wednesdayLength / dailyGoal) * 100
    const wedProg = Math.floor(prog)
    setWednesdayProgress(wedProg)
  }, [wednesdayLength, dailyGoal])

  useEffect(()=>{
    const prog = (thursdayLength / dailyGoal) * 100
    const thursProg = Math.floor(prog)
    setThursdayProgress(thursProg)
  }, [thursdayLength, dailyGoal])

  useEffect(()=>{
    const prog = (fridayLength / dailyGoal) * 100
    const friProg = Math.floor(prog)
    setFridayProgress(friProg)
  }, [fridayLength, dailyGoal])

  useEffect(()=>{
    const prog = (saturdayLength / dailyGoal) * 100
    const satProg = Math.floor(prog)
    setSaturdayProgress(satProg)
  }, [saturdayLength, dailyGoal])

  useEffect(()=>{
    const tosses = sunTosses + monTosses + tuesTosses + wedTosses + thursTosses + friTosses + satTosses

    const catches = sunCatches + monCatches + tuesCatches + wedCatches + thursCatches + friCatches + satCatches

    const misses = sunMisses + monMisses + tuesMisses + wedMisses + thursMisses + friMisses + satMisses

    setWeeksTosses(tosses)
    setWeeksCatches(catches)
    setWeeksMisses(misses)
    const prog = (weekLength / weeklyGoal) * 100
    const weekProg = Math.floor(prog)
    setWeekProgress(weekProg)

  }, [sunTosses, monTosses, tuesTosses, wedTosses, thursTosses, friTosses, satTosses])

  const [weeksTosses, setWeeksTosses] = useState(0)
  const [weeksCatches, setWeeksCatches] = useState(0)
  const [weeksMisses, setWeeksMisses] = useState(0)

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
      {patchPlaytimeGoal({
        id: props.playerPlaytimeGoal.id,
        goalSet: parseInt(goalEditInput.current.value)
      })
      .then(getPlaytimeGoals())
      .then(setGoalEdit(false))
    }
  }}

  const handleMeasureDoubleClick = () => {
    setMeasurementTypeEdit(true)
  }
  const handleMeasureKeyPress = (e)=>{
    if(e.key === "Enter"){
      {patchPlaytimeGoal({
        id: props.playerPlaytimeGoal.id,
        measurementTypeId: parseInt(measurementTypeEditInput.current.value)
      })
      .then(getPlaytimeGoals())
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
    <div className="playtimeGoal">
      Playtime Goal
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
            {weekLength} Games {weeksCatches} Catches {weeksMisses} Misses
          </div>
              <div className="day week goal-container-week column" style={{width: "90%"}}>
                <div className="day week achieved-container-week" style={{width: `${weekProgress}%`}}>
                {weekProgress}%
                </div>
              </div>
        </div>

        </div>

        <div className="middle-chunk row">
          <div className="left-margin column">
          </div>
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
                <div className="day sunday achieved-container" style={{height: `${tuesdayProgress}%`}}>
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