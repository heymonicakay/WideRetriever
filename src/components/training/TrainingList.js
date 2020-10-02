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
//STATE
  const [editMode, setEditMode] = useState(false)
  const [emptyMsg, setEmptyMsg] = useState(false)
//EFFECT
    useEffect(()=>{
      if(props.playerTrainings === []){
        setEmptyMsg(true)}
      else {
        setEmptyMsg(false)}
    }, [props.playerTrainings])
//HANDLE
  const toggleEditMode = () => {
    if (editMode === true) {
      setEditMode(false)}
    else {
      setEditMode(true)}}
//RETURN
  return (
    <>
    {emptyMsg
      ?
      <>
        <div className="cont__list cont__list--tr">
          <h2 className="list__header list__header--tr">
            Training
          </h2>
          <NoTrainings
          player={props.player}
          {...props}/>
        </div>
      </>
      :<>
      <div className="cont__list cont__list--tr">
            <h2 className="list__header list__header--tr">
              Training
            </h2>
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
                />
              })
            }
            </article>
          </div>
      </>
    }
    </>
  )
}