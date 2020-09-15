import React, { useState } from "react"
export const TrainingTypeContext = React.createContext()

export const TrainingTypeProvider = (props) => {
    const [trainingTypes, setTrainingTypes] = useState([])
    const [searchTerms, setTerms] = useState("")


    const getTrainingTypes = () => {
        return fetch("http://localhost:8088/trainingTypes")
            .then(res => res.json())
            .then(setTrainingTypes)
    }

    const getTrainingTypeById = (id) => {
      return fetch(`http://localhost:8088/trainingTypes/${id}`)
          .then(res => res.json())
  }

    const addTrainingType = trainingType => {
        return fetch("http://localhost:8088/trainingTypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trainingType)
        })
            .then(getTrainingTypes)
    }

    const editTrainingType = trainingType => {
      return fetch(`http://localhost:8088/trainingTypes/${trainingType.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(trainingType)
      })
          .then(getTrainingTypes)
  }

  const removeTrainingType = (trainingTypeId) => {
    return fetch(`http://localhost:8088/animals/${trainingTypeId}`, {
        method: "DELETE"
    })
        .then(getTrainingTypes)
}

    return (
        <TrainingTypeContext.Provider value={{
            trainingTypes, addTrainingType, getTrainingTypes, getTrainingTypeById,
            searchTerms, setTerms, removeTrainingType, editTrainingType
        }}>
            {props.children}
        </TrainingTypeContext.Provider>
    )
}