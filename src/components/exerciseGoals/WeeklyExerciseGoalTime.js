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
    //date object
    console.log(thisDay, "this day")

    const thisTimestamp = Date.now(thisDay)
    //timestamp of date object
    console.log(thisTimestamp , " this timestamp")

    const thisDayOfTheWeekInt = thisDay.getDay()
    //integer for current day
    console.log(thisDayOfTheWeekInt , "this Day Of The Week Int")


    const thisDayMinusOne = thisTimestamp - 1 * 24 * 60 * 60 * 1000
    const minusOne = new Date(thisDayMinusOne)

    const thisDayPlusOne = thisTimestamp + 1 * 24 * 60 * 60 * 1000
    const plusOne = new Date(thisDayPlusOne)

    const thisDayMinusTwo = thisTimestamp - 2 * 24 * 60 * 60 * 1000
    const minusTwo = new Date(thisDayMinusTwo)

    const thisDayPlusTwo = thisTimestamp + 2 * 24 * 60 * 60 * 1000
    const plusTwo = new Date(thisDayPlusTwo)

    const thisDayMinusThree = thisTimestamp - 3 * 24 * 60 * 60 * 1000
    const minusThree = new Date(thisDayMinusThree)

    const thisDayPlusThree = thisTimestamp + 3 * 24 * 60 * 60 * 1000
    const plusThree = new Date(thisDayPlusThree)

    const thisDayMinusFour = thisTimestamp - 4 * 24 * 60 * 60 * 1000
    const minusFour = new Date(thisDayMinusFour)

    const thisDayPlusFour = thisTimestamp + 4 * 24 * 60 * 60 * 1000
    const plusFour = new Date(thisDayPlusFour)

    const thisDayMinusFive = thisTimestamp - 5 * 24 * 60 * 60 * 1000
    const minusFive = new Date(thisDayMinusFive)

    const thisDayPlusFive = thisTimestamp + 5 * 24 * 60 * 60 * 1000
    const plusFive = new Date(thisDayPlusFive)

    const thisDayMinusSix = thisTimestamp - 6 * 24 * 60 * 60 * 1000
    const minusSix = new Date(thisDayMinusSix)

    const thisDayPlusSix = thisTimestamp + 6 * 24 * 60 * 60 * 1000
    const plusSix = new Date(thisDayPlusSix)

    const [sunday, setSunday] = useState({})
    const [monday, setMonday] = useState({})
    const [tuesday, setTuesday] = useState({})
    const [wednesday, setWednesday] = useState({})
    const [thursday, setThursday] = useState({})
    const [friday, setFriday] = useState({})
    const [saturday, setSaturday] = useState({})

  useEffect(()=>{
    if(thisDayOfTheWeekInt === 0) {
      setSunday(thisDay)
      setMonday(plusOne)
      setTuesday(plusTwo)
      setWednesday(plusThree)
      setThursday(plusFour)
      setFriday(plusFive)
      setSaturday(plusSix)
    }
    if(thisDayOfTheWeekInt === 1) {
      setSunday(minusOne)
      setMonday(thisDay)
      setTuesday(plusOne)
      setWednesday(plusTwo)
      setThursday(plusThree)
      setFriday(plusFour)
      setSaturday(plusFive)
    }
    if(thisDayOfTheWeekInt === 2) {
      setSunday(minusTwo)
      setMonday(minusOne)
      setTuesday(thisDay)
      setWednesday(plusOne)
      setThursday(plusTwo)
      setFriday(plusThree)
      setSaturday(plusFour)
    }
    if(thisDayOfTheWeekInt === 3) {
      setSunday(minusThree)
      setMonday(minusTwo)
      setTuesday(minusOne)
      setWednesday(thisDay)
      setThursday(plusOne)
      setFriday(plusTwo)
      setSaturday(plusThree)
    }
    if(thisDayOfTheWeekInt === 4) {
      setSunday(minusFour)
      setMonday(minusThree)
      setTuesday(minusTwo)
      setWednesday(minusOne)
      setThursday(thisDay)
      setFriday(plusOne)
      setSaturday(plusTwo)
    }
    if(thisDayOfTheWeekInt === 5) {
      setSunday(minusFive)
      setMonday(minusFour)
      setTuesday(minusThree)
      setWednesday(minusTwo)
      setThursday(minusOne)
      setFriday(thisDay)
      setSaturday(plusOne)
    }
    if(thisDayOfTheWeekInt === 6) {
      setSunday(minusSix)
      setMonday(minusFive)
      setTuesday(minusFour)
      setWednesday(minusThree)
      setThursday(minusTwo)
      setFriday(minusOne)
      setSaturday(thisDay)
    }
  }, [])

  console.log(sunday, "sunday")
  console.log(monday, "monday")
  console.log(tuesday, "tuesday")
  console.log(wednesday, "wednesday")
  console.log(thursday, "sunday")
  console.log(friday, "friday")
  console.log(saturday, "saturday")

// three
// hours
// week

// if today is sunday then sunday is today's date monday is todays date plus one, and tuesday is todays date plus two

// days per week
// hours per week
// times per week

// 30 minutes per day
// 1 hour per day
// 3 times per day

  const frequency = frequencies.find(f => f.id === props.playerExerciseGoal.frequencyId) || {}
  const freq = frequency.each
  console.log(freq, "frequency")

  const meas = measurementTypes.find(mt => mt.id === props.playerExerciseGoal.measurementTypeId) || {}
  const measure = meas.plural

  console.log(props.playerExercises, "ex this week")

  console.log(Date.now(), "date now ")

  const today = Date.now()
  const todayDate = new Date(today)
  const todayDay = todayDate.getDay()
  const dayToday = weekArray[todayDay]

  console.log(todayDate , "today date")
  console.log(todayDay , "today day")
  console.log(dayToday, " day today")


  return (
    <>
    <div className="goal-statement">
      Exercise Goal: {props.playerExerciseGoal.goalSet} {measure} every {freq}
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