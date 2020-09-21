import React, { useState, useContext, useEffect } from "react"
import { PlayerContext } from "./PlayerProvider"
import { Player } from "./Player"
import "./Player.css"

import { UserContext } from "../users/UserProvider"

export const PlayerList = (props) => {

    const { userPlayers, getUserPlayers } = useContext(PlayerContext)
    const { getCurrentUser } = useContext(UserContext)
    const currentUserId = parseInt(sessionStorage.getItem("wr__user"))

    useEffect(() => {
        getCurrentUser()
        getUserPlayers(currentUserId)
    }, [])

    return (
        <>
          {userPlayers.map(p => {

              return <Player {...props}
                  key={p.id}
                  player={p}
              />
            })
        }
      </>
)
}

