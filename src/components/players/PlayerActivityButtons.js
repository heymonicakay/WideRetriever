import React, { useState } from "react"

export const PlayerActivityButtons = (props) => {
  const [isOpen, setIsOpen] = useState(false)

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
          <div className={`add-exercise ${isOpen ? "down-left": ""}`} onClick={() => props.history.push(`/players/exercise/add/${props.playerId}`)}>
            Log Exercise
          </div>
          <div className={`add-playtime ${isOpen ? "out-left": ""}`}  onClick={() => props.history.push(`/players/playtime/add/${props.playerId}`)}>
            Play Ball
          </div>
          <div className={`exercise-goal ${isOpen ? "up-left": ""}`}  onClick={() => props.history.push(`/players/training/add/${props.playerId}`)}>
            Log Training Time
          </div>
      </div>
    </>
    )
}
