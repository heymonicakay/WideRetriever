//IMPORT
  import React, { useState, useContext, useEffect } from "react"
  import { ExerciseContext } from "./ExerciseProvider"
  import { Exercise } from "./Exercise"
  import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"
  import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"
  import { FrequencyContext } from "../goals/FrequencyProvider"
  import { NoExercises } from "./NoExercises"
  import "./Exercise.css"

export const ExerciseList = (props) => {
//CONTEXT
    const { removeExercise } = useContext(ExerciseContext)
    const { exerciseTypes, getExerciseTypes } = useContext(ExerciseTypeContext)
    const { measurementTypes, getMeasurementTypes } = useContext(MeasurementTypeContext)
    const { frequencies, getFrequencies } = useContext(FrequencyContext)
//STATE
    const [editMode, setEditMode] = useState(false)
//EFFECT
    useEffect(() => {
      getExerciseTypes()
      getMeasurementTypes()
      getFrequencies()
    }, [])
//HANDLE
  const toggleEditMode = () => setEditMode(!editMode)
//RETURN
    return (
        <>
            {props.playerExercises.length > 0
            ? <>
            <div className="cont__list cont__list--ex">
                <article className="list list--ex">
                    {props.playerExercises.map(ex => {
                        const exerciseType = exerciseTypes.find(et => et.id === ex.exerciseTypeId) || {}
                        const frequency = frequencies.find(f => f.id === ex.frequencyId) || {}
                        const measuermentType = measurementTypes.find(mt => mt.id === ex.measurementTypeId) || {}

                        return <Exercise {...props}
                        key={ex.id}
                        exercise={ex}
                        player={props.player}
                        playerId={props.playerId}
                        exerciseType={exerciseType}
                        removeExercise={removeExercise}
                        frequency={frequency}
                        measurementType={measuermentType}
                        toggleEditMode={toggleEditMode}
                        isOwner={props.isOwner}
                        todayObj={props.todayObj}
                        />
                    }).reverse()}
                </article>
            </div>
            </>
            :
            <>
            <div className="cont__list cont__list--ex">
                <NoExercises {...props}/>
            </div>
            </>
            }
        </>
    )
}


