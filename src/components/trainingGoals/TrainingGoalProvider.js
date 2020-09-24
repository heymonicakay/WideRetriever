import React, { useState } from "react"
export const TrainingGoalContext = React.createContext()

export const TrainingGoalProvider = (props) => {
    const [trainingGoals, setTrainingGoals] = useState([])
    const [playerTrainingGoals, setPlayerTrainingGoals] = useState([])
    const [searchTerms, setTerms] = useState("")


    const getTrainingGoals = () => {
        return fetch("http://localhost:8088/trainingGoals")
            .then(res => res.json())
            .then(setTrainingGoals)
    }

    const getPlayerTrainingGoals = (playerId) => {
      return fetch(`http://localhost:8088/trainingGoals?playerId=${ playerId }`)
          .then(res => res.json())
          .then(setPlayerTrainingGoals)
  }

    const getTrainingGoalById = (id) => {
      return fetch(`http://localhost:8088/trainingGoals/${id}`)
          .then(res => res.json())
  }

    const addTrainingGoal = trainingGoal => {
        return fetch("http://localhost:8088/trainingGoals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(trainingGoal)
        })
            .then(getTrainingGoals)
    }

    const editTrainingGoal = trainingGoal => {
      return fetch(`http://localhost:8088/trainingGoals/${trainingGoal.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(trainingGoal)
      })
          .then(getTrainingGoals)
  }

  const removeTrainingGoal = (trainingGoalId) => {
    return fetch(`http://localhost:8088/trainingGoals/${trainingGoalId}`, {
        method: "DELETE"
    })
        .then(getTrainingGoals)
}

    return (
        <TrainingGoalContext.Provider value={{
            trainingGoals,
            addTrainingGoal,
            getTrainingGoals,
            getTrainingGoalById,
            searchTerms,
            setTerms,
            removeTrainingGoal,
            editTrainingGoal,
            getPlayerTrainingGoals,
            setPlayerTrainingGoals,
            playerTrainingGoals
        }}>
            {props.children}
        </TrainingGoalContext.Provider>
    )
}