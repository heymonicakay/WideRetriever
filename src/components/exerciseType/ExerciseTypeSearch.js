import React, { useState } from "react"
import { ExerciseTypeSearchDisplay } from "./ExerciseTypeSearchDisplay"

export const ExerciseTypeSearch = ( props ) => {
    const [searchValue, setSearchValue] = useState("")

    return (
        <>
          <input type="text" key={props.etValue} value={props.etType} ref={props.exerciseType}className="exercise-type-search" onChange={props.handleSearchChange} />
          <ExerciseTypeSearchDisplay
          setSearchValue={setSearchValue}
          setEtType={props.setEtType}
          setEtValue={props.setEtValue}
          filteredExerciseTypes={props.filteredExerciseTypes}
          exerciseTypes={props.exerciseTypes}
          searchTerms={props.searchTerms}
          setTerms={props.setTerms}
          {...props}
          />
        </>
    )
}