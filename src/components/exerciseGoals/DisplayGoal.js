import React, { useState, useContext, useRef, useEffect } from "react"
import { ExerciseGoalContext } from "./ExerciseGoalProvider"
import { MeasurementTypeContext } from "../goals/MeasurementTypeProvider"

export const DisplayGoal =(props) => {
    const goalEditInput = useRef(null)
    const measurementTypeEditInput = useRef(null)

    const { getPlayerExerciseGoal, patchExerciseGoal, playerExerciseGoal } = useContext(ExerciseGoalContext)
    const { getMeasurementTypes, measurementTypes } = useContext(MeasurementTypeContext)

    const [measurementTypeEdit, setMeasurementTypeEdit]=useState(false)
    const [plural, setPlural] = useState(false)
    const [goalEdit, setGoalEdit] = useState(false)

    useEffect(()=>{
        getMeasurementTypes()
    }, [])

    useEffect(()=>{
        if(playerExerciseGoal.goalSet > 1){
            setPlural(true)
        }
        else{
            setPlural(false)
        }
    })

    const handleGoalDoubleClick = () => {
        setGoalEdit(true)
    }
    const handleGoalKeyPress = (e) => {
        if(e.key === "Enter"){
            {patchExerciseGoal({
                id: playerExerciseGoal.id,
                goalSet: parseInt(goalEditInput.current.value)
            })
            .then(getPlayerExerciseGoal(playerExerciseGoal.playerId))
            .then(setGoalEdit(false))
            }
        }
    }

    const handleMeasureDoubleClick = () => {
        setMeasurementTypeEdit(true)
    }

    const handleMeasureKeyPress = (e)=>{
        if(e.key === "Enter"){
            {patchExerciseGoal({
            id: playerExerciseGoal.id,
            measurementTypeId: parseInt(measurementTypeEditInput.current.value)
            })
            .then(getPlayerExerciseGoal(playerExerciseGoal.playerId))
            .then(setMeasurementTypeEdit(false))
            }
        }
    }

    const OwnerVerify = () => {
        if(props.isOwner && playerExerciseGoal){
            return(
                <div className="goal-statement">
                    <div className="exerciseGoal">
                        Exercise Goal
                    </div>
                    {goalEdit
                        ? <>
                        <input
                        type="number"
                        defaultValue={playerExerciseGoal.goalSet}
                        min="0"
                        max="60"
                        ref={goalEditInput}
                        name="goalEditInput"
                        className="input input--ex input--goalSet"
                        onKeyPress={handleGoalKeyPress} />
                        </>
                        :<>
                        <span
                        className="goal"
                        onDoubleClick={handleGoalDoubleClick}>
                            {playerExerciseGoal.goalSet}
                        </span>
                        </>
                    }

                    {measurementTypeEdit
                    ?<>
                    <select
                    defaultValue={playerExerciseGoal.measurementType.id}
                    name="measurementType"
                    ref={measurementTypeEditInput}
                    id="measurementTypeEditInput"
                    className="select select--mt"
                    onKeyPress={handleMeasureKeyPress}>
                        {measurementTypes.map(mt => (
                            <option key={mt.id} value={mt.id}>
                                {plural
                                ? mt.plural
                                : mt.measurement
                                }
                            </option>
                        ))}
                    </select>
                    </>
                    :<>
                    <span
                    className="measure"
                    onDoubleClick={handleMeasureDoubleClick}>
                        {playerExerciseGoal && plural
                        ? playerExerciseGoal.measurementType.plural
                        : playerExerciseGoal.measurementType.measurement}
                    </span>
                    </>
                    } every {playerExerciseGoal && playerExerciseGoal.frequency.each}
                </div>
            )
        }
        else{
            return null
        }
    }
    return(
        <>
        <OwnerVerify />
        </>
    )
}