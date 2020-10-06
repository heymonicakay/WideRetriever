import React, { useContext, useState, useEffect, useRef } from "react"
import { TrainingTypeContext } from "./TrainingTypeProvider"
import "../training/TrainingForm.css"

export const TrainingTypeForm = (props) => {
  const newTrainingType = useRef(null)
  const [trainingType, setTrainingType] = useState({})
  const { addTrainingType } = useContext(TrainingTypeContext)

  const handleControlledInputChange= (e) => {
    const newTrainingType = Object.assign({}, trainingType)
    newTrainingType[e.target.name] = e.target.value
    setTrainingType(newTrainingType)
  }

  const constructNewTrainingType = () => {
    {addTrainingType({
      type: trainingType.newTrainingType
    })}
  }

  return (
    <div className="input-ex-type-cont">
      <input
        className="input-ex-type"
        name="newTrainingType"
        onChange={handleControlledInputChange}
        ref={newTrainingType}/>
      <button
        onClick={()=>{
          constructNewTrainingType()
          props.toggleEdit()}}>
            Save
      </button>
    </div>
  )

}