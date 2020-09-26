import React, { useContext, useState, useEffect } from "react"
import { FollowingContext } from "./FollowingProvider"
import { PlayerContext } from "../players/PlayerProvider";
import { FollowedPlayerCard } from "./FollowedPlayerCard"
import "./Following.css"

export const FollowedPlayerList = props => {

  const { followings, getFollowings, currentUserFollowings, getUserFollowings } = useContext(FollowingContext)
  const { players, getPlayers } = useContext(PlayerContext)

  const [playerIdsFollowed, setPlayerIdsFollowed] = useState([])
  const [playersFollowed, setPlayersFollowed] = useState("...fetching")
  useEffect(() => {
    getFollowings()
    .then(getPlayers)
    .then(getUserFollowings(props.currentUserId))
  }, [])

  useEffect(()=>{
    const playerIdsFollowed = currentUserFollowings.map(auf=>auf.followedPlayerId) || []
    setPlayerIdsFollowed(playerIdsFollowed)
  }, [currentUserFollowings])

  useEffect(()=>{
    const playersFollowed = playerIdsFollowed.map(pif => players.find(p=> p.id === pif)) || []
    setPlayersFollowed(playersFollowed)
  }, [playerIdsFollowed])

  const refreshPage = ()=>{
    window.location.reload();
  }

  const handleClick = (playerId) => {
    props.history.push(`/players/${playerId}`)
  }

  if (currentUserFollowings.length < 1) {
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
  if (playersFollowed === []) {
    return (
      <>
        <div className="fetching-followed-pl-msg">
          Fetching...
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div className="followed-pl-list-cont">
          {playersFollowed.map(p => {

              return <FollowedPlayerCard {...props}
                refreshPage={refreshPage}
                key={p.id}
                player={p}
                onClick={()=> handleClick(p.id)}
                currentUserId={props.currentUserId}
            />
          })
        }
      </div>
    </>
  )
  }
}
