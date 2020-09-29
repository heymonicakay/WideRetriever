import React, { useState, useContext, useEffect, useRef } from "react"
import { ExerciseContext } from "./ExerciseProvider"
import { Exercise } from "./Exercise"
import { ExerciseGoalContext } from "../exerciseGoals/ExerciseGoalProvider"
import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
import { FrequencyContext } from "../goals/FrequencyProvider"
import "./Exercise.css"
export const ExerciseList = (props) => {
  //refs
    const goalSet = useRef(null)
    const measurementType = useRef(null)
    const frequency = useRef(null)

  // useContext
    const { getExercises, removeExercise } = useContext(ExerciseContext)
    const { exerciseTypes, getExerciseTypes } = useContext(ExerciseTypeContext)
    const { editExerciseGoal } = useContext(ExerciseGoalContext)
    const { measurementTypes, getMeasurementTypes } = useContext(MeasurementTypeContext)
    const { frequencies, getFrequencies } = useContext(FrequencyContext)

  // useState
    const [exGoal, setExGoal] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [ singular, setSingular ] = useState(true)

  //define ids
    const thisWeek = props.exercisesThisWeek.length

  //useEffect
    useEffect(() => {
      getExerciseTypes()
      getMeasurementTypes()
      getFrequencies()
      .then(getExercises)
  }, [])

    const toggleEditMode = ()=>{
      if(editMode === false) {
        setEditMode(true)
      }
      else {
        setEditMode(false)
      }
    }

    const handleControlledInputChange = (e) => {
      if(goalSet.current.value <= 1) {
        setSingular(true)
      }
      else {
        setSingular(false)
      }
      const newExGoal = Object.assign({}, exGoal)
      newExGoal[e.target.name] = e.target.value
      setExGoal(newExGoal)
    }

    const constructNewExerciseGoal = () => {
      //define player ID

      {editExerciseGoal({
        id: props.playerExerciseGoal.id,
        playerId: props.playerId,
        goalSet: exGoal.goalSet,
        measurementTypeId: exGoal.measurementType,
        frequencyId: exGoal.frequency,
        timestamp: props.todayTimestamp,
        date: props.today,
      })
      .then(() => props.history.push(`/players/${props.playerId}`))}
    }

  //evaluates logged exercises and user:player relationship - displays data accordingly
  const exerciseListVerify = () => {
    if(props.playerExercises.length < 1 && props.currentUserId === props.player.userId) {
      return (
      <>
        <div className="cont__list cont__list--ex">
          <h2 className="list__header list__header--ex">
            Exercise
          </h2>
          {editMode
            ?
            <>
              <input type="number" defaultValue="" min="1" max="60" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange} />

              {singular
                ?
                <>
                  <select defaultValue="" name="measurementType" ref={measurementType} id="measurementType" className="select select--mt" onChange={handleControlledInputChange}>
                    {measurementTypes.map(mt => (
                        <option key={mt.id} value={mt.id}>
                            {mt.measurement}
                        </option>
                    ))}
                </select>
                </>
                :
                <>
                <select defaultValue="" name="measurementType" ref={measurementType} id="measurementType" className="select select--mt" onChange={handleControlledInputChange}>
                    {measurementTypes.map(mt => (
                        <option key={mt.id} value={mt.id}>
                            {mt.plural}
                        </option>
                    ))}
                </select>
                </>
              }
              <label forHTML="frequency">every</label>

              <select defaultValue="" name="frequency" ref={frequency} id="frequency" className="select select--fq" onChange={handleControlledInputChange}>
                    {frequencies.map(f => (
                        <option key={f.id} value={f.id}>
                            {f.each}
                        </option>
                    ))}
              </select>

              <button className="btn btn--submit btn--ex" type="button"
              onClick={e => {
                e.preventDefault()
                constructNewExerciseGoal()
                toggleEditMode()
              }}>
              Update Goal!
              </button>
          </>
          :<>
          <div className="exercise-goals" onClick={toggleEditMode}>
            Goal:
            <br />
            {props.playerExerciseGoal.goalSet}
          </div>

          <div className="exercise-acheived">
            Acheived:
            <br />
            {thisWeek}
            </div>
          </>
          }

          <button className="btn btn--add-ex" onClick={
            () => props.history.push(`/players/exercise/add/${props.playerId}`)
            }>
              Add Exercise
          </button>
          <article className="list list--ex">
            <h1 className="h1 no-data-msg no-ex-msg">
              Woof!
            </h1>
            <h3 className="h5 no-data-msg no-ex-msg">
                {props.player.name} doesn't have any exercise sessions, yet!
            </h3>
          </article>
        </div>
      </>
    )
    }
    if(props.playerExercises.length < 1 && props.currentUserId !== props.player.userId) {
      return (
      <>
        <div className="cont__list cont__list--ex">
          <h2 className="list__header list__header--ex">
            Exercise
          </h2>
          <article className="list list--ex">
            <h1 className="h1 no-data-msg no-ex-msg">
              Woof!
            </h1>
            <h3 className="h5 no-data-msg no-ex-msg">
                {props.player.name} doesn't have any exercise sessions, yet!
            </h3>
          </article>
        </div>
      </>
    )
    }
    if ( props.currentUserId !== props.player.userId ) {
      return (
        <>
        <div className="cont__list cont__list--ex">
          <h2 className="list__header list__header--ex">
            Exercise
          </h2>
            <article className="list list--ex">
              {props.playerExercises.map(ex => {
              const exerciseType = exerciseTypes.find(et => et.id === ex.exerciseTypeId) || {}
              const frequency = frequencies.find(f => f.id === ex.frequencyId) || {}
              const measuermentType = measurementTypes.find(mt => mt.id === ex.measurementTypeId) || {}

              return <Exercise {...props}
                  key={ex.id}
                  exercise={ex}
                  exerciseType={exerciseType}
                  removeExercise={removeExercise}
                  frequency={frequency}
                  measurementType={measuermentType}
                />
              })
            }
            </article>
          </div>
        </>
      )
    }
    else {
      return (
        <>
          <div className="cont__list cont__list--ex">

            <h2 className="list__header list__header--ex">
              Exercise
            </h2>
            {editMode
              ?
              <>
                <input type="number" defaultValue="" min="1" max="60" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange} />

                {singular
                  ?
                  <>
                    <select defaultValue="" name="measurementType" ref={measurementType} id="measurementType" className="select select--mt" onChange={handleControlledInputChange}>
                      {measurementTypes.map(mt => (
                          <option key={mt.id} value={mt.id}>
                              {mt.measurement}
                          </option>
                      ))}
                  </select>
                  </>
                  :
                  <>
                  <select defaultValue="" name="measurementType" ref={measurementType} id="measurementType" className="select select--mt" onChange={handleControlledInputChange}>
                      {measurementTypes.map(mt => (
                          <option key={mt.id} value={mt.id}>
                              {mt.plural}
                          </option>
                      ))}
                  </select>
                  </>
                }
                <label forHTML="frequency">every</label>

                <select defaultValue="" name="frequency" ref={frequency} id="frequency" className="select select--fq" onChange={handleControlledInputChange}>
                      {frequencies.map(f => (
                          <option key={f.id} value={f.id}>
                              {f.each}
                          </option>
                      ))}
                </select>

                <button className="btn btn--submit btn--ex" type="button"
                onClick={e => {
                  e.preventDefault()
                  constructNewExerciseGoal()
                  toggleEditMode()
                }}>
                Update Goal!
                </button>
            </>
              :
              <>
              <div className="exercise-goals" onClick={toggleEditMode}>
            Goal:
            <br />
            {props.playerExerciseGoal.goalSet} per week.
            </div>

            <div className="playtime-acheived">
              Acheived:
              <br />
              {thisWeek}
              </div>
              </>
            }

            <button className="btn btn--add-ex" onClick={
              () => props.history.push(`/players/exercise/add/${props.playerId}`)
            }>
              Add Exercise
            </button>
            <article className="list list--ex">
              {props.playerExercises.map(ex => {
              const exerciseType = exerciseTypes.find(et => et.id === ex.exerciseTypeId) || {}
              const frequency = frequencies.find(f => f.id === ex.frequencyId) || {}
              const measuermentType = measurementTypes.find(mt => mt.id === ex.measurementTypeId) || {}

              return <Exercise {...props}
                  key={ex.id}
                  exercise={ex}
                  exerciseType={exerciseType}
                  removeExercise={removeExercise}
                  frequency={frequency}
                  measurementType={measuermentType}
                />
              })
            }
            </article>
          </div>
        </>
      )
    }
  }
  return (
    <>
    {exerciseListVerify()}
    </>
  )
}

