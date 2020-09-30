import React, { useState } from "react"
export const TrainingGoalContext = React.createContext()

export const TrainingGoalProvider = (props) => {
    const [trainingGoals, setTrainingGoals] = useState([])
    const [playerTrainingGoal, setPlayerTrainingGoal] = useState({})
    const [searchTerms, setTerms] = useState("")
    const [noTrGoal, setNoTrGoal] = useState(true)


    const getTrainingGoals = () => {
        return fetch("http://localhost:8088/trainingGoals")
            .then(res => res.json())
            .then(setTrainingGoals)
    }

    const getPlayerTrainingGoal = (playerId) => {
      const playerTrainingGoal = trainingGoals.find(tg=> tg.playerId === playerId) || {}
      setPlayerTrainingGoal(playerTrainingGoal)
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
            getPlayerTrainingGoal,
            setPlayerTrainingGoal,
            playerTrainingGoal,
            noTrGoal, setNoTrGoal
        }}>
            {props.children}
        </TrainingGoalContext.Provider>
    )
}