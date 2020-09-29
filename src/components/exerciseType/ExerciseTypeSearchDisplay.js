import React from "react"
import { ExerciseTypeSearchResult } from "./ExerciseTypeSearchResult"

export const ExerciseTypeSearchDisplay = (props) => {

  const handleClick = (key) => {

  }
    const resultVerify = () => {
      if(props.searchTerms.length < 1) {
        return null
      }
      if(props.filteredExerciseTypes.length < 1) {
        return (
          <div className="no-pl-found">
            Sorry, we didn't find anything!
          </div>
        )
      }
      else {
        return (
          <>
            <div className="search-results-list">

              {props.filteredExerciseTypes.map(et=>{
                return <ExerciseTypeSearchResult {...props}
                key={et.id}
                exerciseType={et}
                setTerms={props.setTerms}
                setEtType={props.setEtType}
                setEtValue={props.setEtValue}
                />
              })}
            </div>
          </>
        )
      }
    }
    return (
      <>
        {resultVerify()}
      </>
    )
}