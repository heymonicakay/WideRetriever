import React, { useState } from "react"
export const PlaytimeContext = React.createContext()

export const PlaytimeProvider = (props) => {
    const [playtimes, setPlaytimes] = useState([])
    const [playerPlaytimes, setPlayerPlaytimes] = useState([])

    const [searchTerms, setTerms] = useState("")


    const getPlaytimes = () => {
        return fetch("http://localhost:8088/playtimes")
            .then(res => res.json())
            .then(setPlaytimes)
    }

    const getPlaytimeById = (id) => {
      return fetch(`http://localhost:8088/playtimes/${id}`)
          .then(res => res.json())
  }

    const getPlayerPlaytimes = (playerId) => {
      const playerPlaytimes = playtimes.filter(pt => pt.playerId === playerId) || []
      setPlayerPlaytimes(playerPlaytimes)
    }

    const addPlaytime = playtime => {
        return fetch("http://localhost:8088/playtimes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playtime)
        })
            .then(getPlaytimes)
    }

    const editPlaytime = playtime => {
      return fetch(`http://localhost:8088/playtimes/${playtime.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(playtime)
      })
          .then(getPlaytimes)
  }

  const removePlaytime = (playtimeId) => {
    return fetch(`http://localhost:8088/playtimes/${playtimeId}`, {
        method: "DELETE"
    })
        .then(getPlaytimes)
}

    return (
        <PlaytimeContext.Provider value={{
            playtimes, addPlaytime, getPlaytimes, getPlaytimeById,
            searchTerms, setTerms, removePlaytime, editPlaytime, getPlayerPlaytimes, playerPlaytimes, setPlayerPlaytimes
        }}>
            {props.children}
        </PlaytimeContext.Provider>
    )
}