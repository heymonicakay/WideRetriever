import React, { useContext, useState, useEffect } from "react"
import { FollowingContext } from "./FollowingProvider"
import { PlayerContext } from "../players/PlayerProvider";
import { FollowedPlayerCard } from "./FollowedPlayerCard"
import "./Following.css"

export const FollowedPlayerList = props => {

  const currentUserId = parseInt(sessionStorage.getItem("wr__user"))

  const { userFollowings, setUserFollowings, getFollowings, getUserFollowings, followings } = useContext(FollowingContext)
  const { players, getPlayers } = useContext(PlayerContext)

  const [isLoading, setIsLoading] = useState(true)

  const playerIdsFollowed = userFollowings.map(auf=>auf.followedPlayerId) || []
  const playersFollowed = playerIdsFollowed.map(pif => players.find(p=> p.id === pif)) || []

  //useEffect
  useEffect(() => {
    getPlayers()
    getFollowings()
  }, [])

  useEffect(() => {
    getUserFollowings(currentUserId)
    .then(setIsLoading(false))
  }, [followings])

  useEffect(() => {
    getUserFollowings(currentUserId)
  }, [])

  const refreshPage = ()=>{
    window.location.reload();
  }

  if (isLoading === true) {
    return (
      <>
        <div className="fetching-followed-pl-msg">
          Fetching...
        </div>
      </>
    )
  }
  else if (playersFollowed === undefined ) {
    return (
      <>
        <div className="oops-followed-pl-msg">
          Oops...
        </div>
      </>
    )
  }
  else if (isLoading !== true && playersFollowed.length < 1) {
    return (
      <>
          <div className="no-followed-pl-msg">
            You are not
            <br />
            currently following
            <br />
            any players.
          </div>
      </>
    )
  }
  else if (isLoading !== true && playersFollowed !== []) {
    return (
      <>
        <div className="followed-pl-list-cont">
          {playersFollowed.map(player => {
            const playerId = player.id

            const handleClick = (e) => {
              e.preventDefault()
              props.history.push(`/players/${playerId}`)
            }
            return <FollowedPlayerCard {...props}
                    refreshPage={refreshPage}
                    key={player.id}
                    player={player}
                    handleClick={handleClick}
                  />
            })
          }
        </div>
      </>
    )
  }
}