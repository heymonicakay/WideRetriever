import React, {useEffect, useState } from "react"

export const PlayerGoalButtons = (props)=> {
  const [hidePtGoalBtn, setHidePtGoalBtn] = useState(true)
  const [hideTrGoalBtn, setHideTrGoalBtn] = useState(true)
  const [hideExGoalBtn, setHideExGoalBtn] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(()=>{
    if(props.playerPlaytimeGoal === {}){
      setHidePtGoalBtn(false)
    }
    else{
      setHidePtGoalBtn(true)
    }
  }, [props.playerPlaytimeGoal])

  useEffect(()=>{
    if(props.playerTrainingGoal === {}){
      setHideTrGoalBtn(false)
    }
    else{
      setHideTrGoalBtn(true)
    }
  }, [props.playerTrainingGoal])

  useEffect(()=>{
    if(props.playerExerciseGoal === {}){
      setHideExGoalBtn(false)
    }
    else{
      setHideExGoalBtn(true)
    }
  }, [props.playerExerciseGoal])

  const toggleOpen = () => {
    if(isOpen === true) {
      setIsOpen(false)
    }
    else{
      setIsOpen(true)
    }
  }

  return (
      <>
      <div className="button-bloom" onClick={toggleOpen}>
       {hidePtGoalBtn
        ? <></>
        : <>
          <div className={`playtime-goal ${isOpen ? "down-left": ""}`} onClick={()=>{
          props.history.push(`/players/goals/playtime/add/${props.playerId}`)
            }}>
              Add Playtime Goal
          </div>
          </>
        }
        {hideTrGoalBtn
        ? <></>
        : <>
          <div className={`training-goal ${isOpen ? "out-left": ""}`}  onClick={()=>{
            props.history.push(`/players/goals/training/add/${props.playerId}`)
            }}>
            Add Training Goal
          </div>
          </>
        }
        {hideExGoalBtn
        ? <></>
        : <>
          <div className={`exercise-goal ${isOpen ? "up-left": ""}`}  onClick={()=>{
            props.history.push(`/players/goals/exercise/add/${props.playerId}`)
            }}>
            Add Exercise Goal
          </div>
          </>
        }
      </div>
    </>
  )
}

