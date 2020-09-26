import React, { useState, useContext, useEffect } from "react"
import { PlayerContext } from "./PlayerProvider"
import { Player } from "./Player"
import "./Player.css"

import { UserContext } from "../users/UserProvider"

export const PlayerList = (props) => {

    const { userPlayers, getUserPlayers, setUsersPlayers } = useContext(PlayerContext)
    const { getCurrentUser, currentUser, setCurrentUser } = useContext(UserContext)

    useEffect(() => {
        getCurrentUser(props.currentUserId)
        .then(setCurrentUser)
        getUserPlayers(props.currentUserId)
        .then(setUsersPlayers)
    }, [])

    return (
        <>
          {userPlayers.map(p => {

              return <Player
                {...props}
                  key={p.id}
                  player={p}
                  currentUser={currentUser}
              />
            })
        }
      </>
)
}

