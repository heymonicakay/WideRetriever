import React, { useState, useEffect } from "react"
export const ExerciseGoalContext = React.createContext()

export const ExerciseGoalProvider = (props) => {
    const [exerciseGoals, setExerciseGoals] = useState([])
    const [playerExerciseGoal, setPlayerExerciseGoal] = useState({})
    const [searchTerms, setTerms] = useState("")

    const getExerciseGoals = () => {

        return fetch("http://localhost:8088/exerciseGoals")
            .then(res => res.json())
            .then(setExerciseGoals)
    }

    const getPlayerExerciseGoal = (playerId) => {
      const playerExerciseGoal = exerciseGoals.find(eg => eg.playerId === playerId) || {}
      setPlayerExerciseGoal(playerExerciseGoal)
    }

    const getExerciseGoalById = (id) => {
      return fetch(`http://localhost:8088/exerciseGoals/${id}`)
          .then(res => res.json())
  }

    const addExerciseGoal = exerciseGoal => {
        return fetch("http://localhost:8088/exerciseGoals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exerciseGoal)
        })
          .then(getExerciseGoals)
    }

    const editExerciseGoal = exerciseGoal => {
      return fetch(`http://localhost:8088/exerciseGoals/${exerciseGoal.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(exerciseGoal)
      })
          .then(getExerciseGoals)
  }
  const patchExerciseGoal = exerciseGoal => {
    return fetch(`http://localhost:8088/exerciseGoals/${exerciseGoal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(exerciseGoal)
    }).then(getExerciseGoals);
  };

  const removeExerciseGoal = (exerciseGoalId) => {
    return fetch(`http://localhost:8088/exerciseGoals/${exerciseGoalId}`, {
        method: "DELETE"
    })
        .then(getExerciseGoals)
}

useEffect(()=>{
  getExerciseGoals()
}, [])

    return (
        <ExerciseGoalContext.Provider value={{
            exerciseGoals,
            addExerciseGoal,
            getExerciseGoals,
            getExerciseGoalById,
            searchTerms,
            setTerms,
            removeExerciseGoal,
            editExerciseGoal,
            getPlayerExerciseGoal,
            setPlayerExerciseGoal,
            playerExerciseGoal,
            patchExerciseGoal
        }}>
            {props.children}
        </ExerciseGoalContext.Provider>
    )
}