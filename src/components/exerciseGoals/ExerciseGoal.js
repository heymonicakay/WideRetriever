import React, { useState, useContext, useEffect, useRef } from "react"
import { ExerciseGoalContext } from "./ExerciseGoalProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
import { FrequencyContext } from "../goals/FrequencyProvider"
import "../exercise/Exercise.css"

export const ExerciseGoal = (props) => {
  // useContext
    const { getExerciseGoals, exerciseGoals } = useContext(ExerciseGoalContext)
    const { measurementTypes, getMeasurementTypes } = useContext(MeasurementTypeContext)
    const { frequencies, getFrequencies } = useContext(FrequencyContext)

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
      <div className="chart-container column">

        <div className="heading-container column">
          <div className="heading">
            The Week So Far
          </div>
          <div className="sub-heading">
            Sub Heading
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
              </div>
            </div>

            <div className="day-container">
              <div className="day monday goal-container column">
                <div className="day monday achieved-container">
                </div>
              </div>
              <div className="day-label monday-label row">
              </div>
            </div>

            <div className="day-container">
              <div className="day tuesday goal-container column">
                <div className="day tuesday achieved-container">
                </div>
              </div>
              <div className="day-label tuesday-label row">
              </div>
            </div>

            <div className="day-container">
              <div className="day wednesday goal-container column">
                <div className="day wednesday achieved-container">
                </div>
              </div>
              <div className="day-label wednesday-label row">
              </div>
            </div>

            <div className="day-container">
              <div className="day thursday goal-container column">
                <div className="day thursday achieved-container">
                </div>
              </div>
              <div className="day-label thursday-label row">
              </div>
            </div>

            <div className="day-container">
              <div className="day friday goal-container column">
                <div className="day friday achieved-container">
                </div>
              </div>
              <div className="day-label friday-label row">
              </div>
            </div>

            <div className="day-container">
              <div className="day saturday goal-container column">
                <div className="day saturday achieved-container">
                </div>
              </div>
              <div className="day-label saturday-label row">
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