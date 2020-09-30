import React, { useState, useContext, useEffect, useRef } from "react"
import { ExerciseGoalContext } from "../exerciseGoals/ExerciseGoalProvider"
//refs
const goalSet = useRef(null)
const measurementType = useRef(null)
const frequency = useRef(null)

    const { editExerciseGoal } = useContext(ExerciseGoalContext)
    const [exGoal, setExGoal] = useState([])

    const [ singular, setSingular ] = useState(true)

//define ids
const thisWeek = props.exercisesThisWeek.length
useEffect(() => {
  getExerciseTypes()
  getMeasurementTypes()
  getFrequencies()
  .then(getExercises)
}, [])

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
  return(

    // <div className="cont__list cont__list--ex">

    // <h2 className="list__header list__header--ex">
    //   Exercise
    // </h2>
    // {editMode
//   ?
//   <>
//     <input type="number" defaultValue="" min="1" max="60" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange} />

//     {singular
//       ?
//       <>
//         <select defaultValue="" name="measurementType" ref={measurementType} id="measurementType" className="select select--mt" onChange={handleControlledInputChange}>
//           {measurementTypes.map(mt => (
  //               <option key={mt.id} value={mt.id}>
  //                   {mt.measurement}
  //               </option>
  //           ))}
  //       </select>
  //       </>
  //       :
  //       <>
  //       <select defaultValue="" name="measurementType" ref={measurementType} id="measurementType" className="select select--mt" onChange={handleControlledInputChange}>
  //           {measurementTypes.map(mt => (
    //               <option key={mt.id} value={mt.id}>
    //                   {mt.plural}
    //               </option>
    //           ))}
    //       </select>
    //       </>
    //     }
    //     <label forHTML="frequency">every</label>

    //     <select defaultValue="" name="frequency" ref={frequency} id="frequency" className="select select--fq" onChange={handleControlledInputChange}>
    //           {frequencies.map(f => (
      //               <option key={f.id} value={f.id}>
      //                   {f.each}
      //               </option>
      //           ))}
      //     </select>

      //     <button className="btn btn--submit btn--ex" type="button"
      //     onClick={e => {
        //       e.preventDefault()
        //       constructNewExerciseGoal()
        //       toggleEditMode()
        //     }}>
        //     Update Goal!
//     </button>
// </>
//   :
//   <>
//   <div className="exercise-goals" onClick={toggleEditMode}>
// Goal:
// <br />
// {props.playerExerciseGoal.goalSet} per week.
// </div>

// <div className="playtime-acheived">
//   Acheived:
//   <br />
//   {thisWeek}
//   </div>
//   </>
// }
)