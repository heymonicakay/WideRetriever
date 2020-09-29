import React from "react"
export const ExerciseTypeSearchResult = ( props ) => {

  return (
    <div className="et-search-res" onClick={()=>{
      props.setEtType(props.exerciseType.type)
      props.setEtValue(props.exerciseType.id)
      props.setTerms("")
      }}>
        {props.exerciseType.type}
    </div>
  )
}