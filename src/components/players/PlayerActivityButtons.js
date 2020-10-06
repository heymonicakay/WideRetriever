import React, { useState } from "react"
import "./PlayerActivityButtons.css"

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
        <div className="button-bloom-activity">

          <div className={`plus-sign ${isOpen ? "rotate": ""}`}  onClick={toggleOpen}>
            <img src="https://res.cloudinary.com/heymonicakay/image/upload/v1601928893/wideRetriever/5F802942-7530-4542-B9EC-4097C719F8D3_sbzief.png" alt="" className={`plus-sign-img ${isOpen ? "rotate": ""}`} />
          </div>
          <div className={`add-exercise ${isOpen ? "down-left": ""}`} onClick={() => props.history.push(`/players/exercise/add/${props.playerId}`)} title="Log Exercise">
            <img src="https://res.cloudinary.com/heymonicakay/image/upload/v1601938881/wideRetriever/C26730BC-D364-4ED4-BF9B-4D6471431049_dxtnzn.png" alt="" className={`add-exercise-img ${isOpen ? "down-left": ""}`} />
          </div>
          <div className={`add-playtime ${isOpen ? "out-left": ""}`}  onClick={() => props.history.push(`/players/playtime/add/${props.playerId}`)} title="Log Playtime">

            <img src="https://res.cloudinary.com/heymonicakay/image/upload/v1601928893/wideRetriever/B877BBFA-1371-41FC-8C14-6B1AAFEA038A_syfmtp.png" alt="" className={`add-playtime-img ${isOpen ? "out-left": ""}`}/>
          </div>
          <div className={`add-training ${isOpen ? "up-left": ""}`}  onClick={() => props.history.push(`/players/training/add/${props.playerId}`)} title="Log Training">

            <img src="https://res.cloudinary.com/heymonicakay/image/upload/v1601928895/wideRetriever/592D16C2-6B72-42DB-A9CA-03B9975CE43D_jduhgb.png" alt="" className={`add-training-img ${isOpen ? "up-left": ""}`} />
          </div>
      </div>
    </>
    )
}
