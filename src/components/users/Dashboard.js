import React, { useState, useContext, useEffect } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { PlayerList } from "../players/PlayerList"
import "../players/Player.css"

import { UserContext } from "../users/UserProvider"
import "./Dashboard.css"

export const UserDash = (props) => {

  const { userPlayers, getUserPlayers  } = useContext(PlayerContext)
  const { getCurrentUser, currentUser  } = useContext(UserContext)

  useEffect(() => {
      getCurrentUser(props.currentUserId)
      getUserPlayers(props.currentUserId)
  }, [])

  return (
      <>
        <div className="user-dash-top">
          <div className="welcome-msg">
            <p className="welcome-msg hello">
              hello, {currentUser.username}.
            </p>
          </div>
          <div className="player-list-dash">
            <PlayerList
              {...props}
              currentUser={currentUser}
              usersPlayers={userPlayers}
              />
          </div>
          <p className="welcome-msg summary">
            Here's a summary of your upcoming tasks.
          </p>
        </div>
      </>
)
}