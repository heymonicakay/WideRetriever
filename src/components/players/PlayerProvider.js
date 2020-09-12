import React, { useState } from "react"
export const PlayerContext = React.createContext()

export const PlayerProvider = (props) => {
    const [players, setPlayers] = useState([])
    const [searchTerms, setTerms] = useState("")


    const getPlayers = () => {
        return fetch("http://localhost:8088/players")
            .then(res => res.json())
            .then(setPlayers)
    }

    const getPlayerById = (id) => {
      return fetch(`http://localhost:8088/players/${id}`)
          .then(res => res.json())
  }

    const addPlayer = player => {
        return fetch("http://localhost:8088/players", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(player)
        })
            .then(getPlayers)
    }

    const editPlayer = player => {
      return fetch(`http://localhost:8088/players/${player.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(player)
      })
          .then(getPlayers)
  }

  const removePlayer = (playerId) => {
    return fetch(`http://localhost:8088/animals/${playerId}`, {
        method: "DELETE"
    })
        .then(getPlayers)
}

    return (
        <PlayerContext.Provider value={{
            players, addPlayer, getPlayers, getPlayerById,
            searchTerms, setTerms, removePlayer, editPlayer
        }}>
            {props.children}
        </PlayerContext.Provider>
    )
}