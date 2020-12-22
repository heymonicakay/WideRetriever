import React, { useState, useEffect } from "react"
export const ExerciseGoalContext = React.createContext()

export const ExerciseGoalProvider = (props) => {
    const [exerciseGoals, setExerciseGoals] = useState([])
    const [playerExerciseGoal, setPlayerExerciseGoal] = useState({measurementType: {}, frequency: {}})
    const [searchTerms, setTerms] = useState("")
    const url = "http://localhost:8088/"
    const resource = "exerciseGoals"

    const getExerciseGoals = () => {

        return fetch(`${url}${resource}`)
            .then(res => res.json())
            .then(setExerciseGoals)
    }

    // const getPlayerExerciseGoal = (playerId) => {
    //   const playerExerciseGoal = exerciseGoals.find(eg => eg.playerId === playerId) || {}
    //   setPlayerExerciseGoal(playerExerciseGoal)
    // }

    const getExerciseGoalById = (id) => {
        return fetch(`${url}${resource}/${id}`)
            .then(res => res.json())
    }

    const getPlayerExerciseGoal = (playerId) => {
        return fetch(`${url}${resource}?playerId=${playerId}&&_expand=measurementType&&_expand=frequency`)
            .then(res => res.json())
            .then((res)=>{
                setPlayerExerciseGoal(res[0])
            })
    }

    const addExerciseGoal = exerciseGoal => {
        return fetch(`${url}${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exerciseGoal)
        })
        .then(getExerciseGoals)
    }

    const editExerciseGoal = exerciseGoal => {
        return fetch(`${url}${resource}/${exerciseGoal.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exerciseGoal)
        })
            .then(getExerciseGoals)
    }

    const patchExerciseGoal = exerciseGoal => {
        return fetch(`${url}${resource}/${exerciseGoal.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(exerciseGoal)
        }).then(getExerciseGoals);
    }

    const removeExerciseGoal = (exerciseGoalId) => {
        return fetch(`${url}${resource}/${exerciseGoalId}`, {
            method: "DELETE"
        })
        .then(getExerciseGoals)
    }

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