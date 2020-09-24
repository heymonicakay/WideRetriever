import React, { useState } from "react"
export const TrainingContext = React.createContext()

export const TrainingProvider = (props) => {
    const [trainings, setTrainings] = useState([])
    const [searchTerms, setTerms] = useState("")
    const [playerTrainings, setPlayerTrainings] = useState([])


    const getTrainings = () => {
        return fetch("http://localhost:8088/trainings")
            .then(res => res.json())
            .then(setTrainings)
    }

    const getTrainingByPlayerId = (playerId) => {
      return fetch(`http://localhost:8088/trainings?playerId=${playerId}`)
          .then(res => res.json())
          .then(setPlayerTrainings)
  }

    const getTrainingById = (id) => {
      return fetch(`http://localhost:8088/trainings/${id}`)
          .then(res => res.json())
  }

    const addTraining = training => {
        return fetch("http://localhost:8088/trainings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(training)
        })
            .then(getTrainings)
    }

    const editTraining = training => {
      return fetch(`http://localhost:8088/trainings/${training.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(training)
      })
          .then(getTrainings)
  }

  const removeTraining = (trainingId) => {
    return fetch(`http://localhost:8088/trainings/${trainingId}`, {
        method: "DELETE"
    })
        .then(getTrainings)
}

    return (
        <TrainingContext.Provider value={{
            trainings, addTraining, getTrainings, getTrainingById,
            searchTerms, setTerms, removeTraining, editTraining,
            getTrainingByPlayerId
        }}>
            {props.children}
        </TrainingContext.Provider>
    )
}