import React, { useState } from "react"
export const PlaytimeGoalContext = React.createContext()

export const PlaytimeGoalProvider = (props) => {
    const [playtimeGoals, setPlaytimeGoals] = useState([])
    const [playerPlaytimeGoals, setPlayerPlaytimeGoals] = useState([])
    const [searchTerms, setTerms] = useState("")


    const getPlaytimeGoals = () => {
        return fetch("http://localhost:8088/playtimeGoals")
            .then(res => res.json())
            .then(setPlaytimeGoals)
    }

    const getPlayerPlaytimeGoals = (playerId) => {
      return fetch(`http://localhost:8088/playtimeGoals?playerId=${ playerId }`)
          .then(res => res.json())
          .then(setPlayerPlaytimeGoals)
  }

    const getPlaytimeGoalById = (id) => {
      return fetch(`http://localhost:8088/playtimeGoals/${id}`)
          .then(res => res.json())
  }

    const addPlaytimeGoal = playtimeGoal => {
        return fetch("http://localhost:8088/playtimeGoals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playtimeGoal)
        })
            .then(getPlaytimeGoals)
    }

    const editPlaytimeGoal = playtimeGoal => {
      return fetch(`http://localhost:8088/playtimeGoals/${playtimeGoal.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(playtimeGoal)
      })
          .then(getPlaytimeGoals)
  }

  const removePlaytimeGoal = (playtimeGoalId) => {
    return fetch(`http://localhost:8088/playtimeGoals/${playtimeGoalId}`, {
        method: "DELETE"
    })
        .then(getPlaytimeGoals)
}

    return (
        <PlaytimeGoalContext.Provider value={{
            playtimeGoals,
            addPlaytimeGoal,
            getPlaytimeGoals,
            getPlaytimeGoalById,
            searchTerms,
            setTerms,
            removePlaytimeGoal,
            editPlaytimeGoal,
            getPlayerPlaytimeGoals,
            setPlayerPlaytimeGoals,
            playerPlaytimeGoals
        }}>
            {props.children}
        </PlaytimeGoalContext.Provider>
    )
}