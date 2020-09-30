import React, { useState } from "react"
export const ExerciseContext = React.createContext()

export const ExerciseProvider = (props) => {
    const [exercises, setExercises] = useState([])
    const [playerExercises, setPlayerExercises] = useState([])
    const [searchTerms, setTerms] = useState("")


    const getExercises = () => {
        return fetch("http://localhost:8088/exercises")
            .then(res => res.json())
            .then(setExercises)
    }

    const getExerciseById = (id) => {
      return fetch(`http://localhost:8088/exercises/${id}`)
          .then(res => res.json())
  }
    const getPlayerExercises = (playerId) => {
      const playerExercises = exercises.filter(ex => ex.playerId === playerId) || []
      setPlayerExercises(playerExercises)
    }

    const addExercise = exercise => {
        return fetch("http://localhost:8088/exercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exercise)
        })
            .then(getExercises)
    }

    const editExercise = exercise => {
      return fetch(`http://localhost:8088/exercises/${exercise.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(exercise)
      })
          .then(getExercises)
  }

  const removeExercise = (exerciseId) => {
    return fetch(`http://localhost:8088/exercises/${exerciseId}`, {
        method: "DELETE"
    })
        .then(getExercises)
}

    return (
        <ExerciseContext.Provider value={{
            exercises, addExercise, getExercises, getExerciseById,
            searchTerms, setTerms, removeExercise, editExercise, getPlayerExercises, playerExercises, setPlayerExercises
        }}>
            {props.children}
        </ExerciseContext.Provider>
    )
}