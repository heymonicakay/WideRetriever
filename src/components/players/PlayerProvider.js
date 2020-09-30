import React, { useState } from "react"
export const PlayerContext = React.createContext()

export const PlayerProvider = (props) => {
    const [players, setPlayers] = useState([])
    const [player, setPlayer] = useState({})
    const [searchTerms, setTerms] = useState("")
    const [userPlayers, setUserPlayers] = useState([])

    const getPlayers = () => {
        return fetch("http://localhost:8088/players")
            .then(res => res.json())
            .then(setPlayers)
    }

    const getPlayerByPlayerId = (id) => {
      return fetch(`http://localhost:8088/players/${id}`)
          .then(res => res.json())
          .then(setPlayer)
  }

  const getUserPlayers = (currentUserId) => {
        return fetch(`http://localhost:8088/players?userId=${currentUserId}`)
            .then(res => res.json())
            .then(setUserPlayers)
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
    return fetch(`http://localhost:8088/players/${playerId}`, {
        method: "DELETE"
    })
        .then(getPlayers)
}

    return (
        <PlayerContext.Provider value={{
            players,
            addPlayer,
            getPlayers,
            searchTerms,
            setTerms,
            removePlayer,
            editPlayer,
            getUserPlayers,
            userPlayers,
            getPlayerByPlayerId,
            player,
            setPlayer
        }}>
            {props.children}
        </PlayerContext.Provider>
    )
}