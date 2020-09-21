import React, { useContext, useEffect } from "react"
import { FollowingContext } from "./FollowingProvider"
import { PlayerContext } from "../players/PlayerProvider";
import { FollowedPlayerCard } from "./FollowedPlayerCard"
import "./Following.css"

export const FollowedPlayerList = props => {

  const activeUser = parseInt(sessionStorage.getItem("wr__user"))
  const { followings } = useContext(FollowingContext)
  const { players, setFilteredPlayersFollowing,
    filteredPlayersFollowing } = useContext(PlayerContext)
  const activeUsersFollowings = followings.filter(f => f.userId === activeUser)

console.log(activeUsersFollowings)

  const playerIdsFollowed = activeUsersFollowings.map(auf=>auf.followedPlayerId)

  console.log(playerIdsFollowed)

  const playersFollowed = playerIdsFollowed.map(pif => players.find(p=> p.id === pif))


  //useEffect
  useEffect(() => {
    setFilteredPlayersFollowing(playersFollowed)
  }, [])

  useEffect(() => {
    setFilteredPlayersFollowing(playersFollowed)
  }, [players])

  if (playersFollowed.length < 1) {
    return (
      <>
        <h2 className="h2 header followed-pl-list">Players</h2>
        <div className="no-followed-pl-msg">You are not currently following any players.</div>
      </>
    )
  }
  else {
    return (
      <>
        <h2 className="h2 header followed-pl-list">Players</h2>
        <div className="followed-pl-list">
          {
            filteredPlayersFollowing.map(player => {
                return <FollowedPlayerCard {...props}
                    key={player.id}
                    player={player}
                />
            })
          }
        </div>
      </>
    )
  }
}