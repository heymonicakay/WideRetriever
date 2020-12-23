//IMPORT
  import React, { useState, useContext, useEffect } from "react"
  import { TrainingContext } from "./TrainingProvider"
  import { Training } from "./Training"
  import { TrainingTypeContext } from "../trainingType/TrainingTypeProvider"
  import { NoTrainings } from "./NoTrainings"

export const TrainingList = (props) => {
//CONTEXT
  const { removeTraining } = useContext(TrainingContext)
  const { trainingTypes } = useContext(TrainingTypeContext)
//RETURN
    return ( <>
        {props.playerTrainings.length > 0
        ? <div className="cont__list cont__list--tr">
            <article className="list list--tr">
                {props.playerTrainings.map(tr => {
                    const trainingType = trainingTypes.find(tt => tt.id === tr.trainingTypeId) || {}
                    
                    return <Training {...props}
                    key={tr.id}
                    training={tr}
                    trainingType={trainingType}
                    removeTraining={removeTraining}
                    player={props.player}
                    playerId={props.playerId}
                    currentUserId={props.currentUserId}
                    isOwner={props.isOwner}
                    />
                }).reverse()}
            </article>
        </div>
        : <div className="cont__list cont__list--tr">
            <NoTrainings
            player={props.player}
            {...props}/>
        </div>
        }
    </>)
}