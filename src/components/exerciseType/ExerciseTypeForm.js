import React, { useContext, useState, useEffect, useRef } from "react"
import { ExerciseTypeContext } from "../exerciseType/ExerciseTypeProvider"
import "../exercise/ExerciseForm.css"

export const ExerciseTypeForm = (props) => {
  const newExerciseType = useRef(null)

  const [exerciseType, setExerciseType] = useState({})

  const { addExerciseType } = useContext(ExerciseTypeContext)

  const handleControlledInputChange= (e) => {
    const newExerciseType = Object.assign({}, exerciseType)
    newExerciseType[e.target.name] = e.target.value
    setExerciseType(newExerciseType)
  }

  const constructNewExerciseType = () => {
    {addExerciseType({
      type: exerciseType.newExerciseType
    })}
  }

  return (
    <div className="input-ex-type-cont">
      <input
        className="input-ex-type"
        name="newExerciseType"
        onChange={handleControlledInputChange}
        ref={newExerciseType}/>
      <button
        onClick={()=>{
          constructNewExerciseType()
          props.toggleEdit()}}>
            Save
      </button>
    </div>
  )

}