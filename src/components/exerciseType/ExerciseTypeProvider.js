import React, { useState } from "react"
export const ExerciseTypeContext = React.createContext()

export const ExerciseTypeProvider = (props) => {
    const [exerciseTypes, setExerciseTypes] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getExerciseTypes = () => {
        return fetch("http://localhost:8088/exerciseTypes")
            .then(res => res.json())
            .then(setExerciseTypes)
    }

    const getExerciseTypeById = (id) => {
      return fetch(`http://localhost:8088/exerciseTypes/${id}`)
          .then(res => res.json())
  }

    const addExerciseType = exerciseType => {
        return fetch("http://localhost:8088/exerciseTypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exerciseType)
        })
            .then(getExerciseTypes)
    }

    const editExerciseType = exerciseType => {
      return fetch(`http://localhost:8088/exerciseTypes/${exerciseType.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(exerciseType)
      })
          .then(getExerciseTypes)
  }

  const removeExerciseType = (exerciseTypeId) => {
    return fetch(`http://localhost:8088/exerciseTypes/${exerciseTypeId}`, {
        method: "DELETE"
    })
        .then(getExerciseTypes)
}

    return (
        <ExerciseTypeContext.Provider value={{
            exerciseTypes,
            addExerciseType,
            getExerciseTypes,
            getExerciseTypeById,
            searchTerms,
            setTerms,
            removeExerciseType,
            editExerciseType
        }}>
            {props.children}
        </ExerciseTypeContext.Provider>
    )
}