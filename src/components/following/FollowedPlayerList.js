import React, { useContext, useState, useEffect } from "react"
import { FollowingContext } from "./FollowingProvider"
import { PlayerContext } from "../players/PlayerProvider";
import { FollowedPlayerCard } from "./FollowedPlayerCard"
import "./Following.css"

export const FollowedPlayerList = props => {

  const { fullFollowings, getFullFollowings, currentUserFollowings, getUserFollowings } = useContext(FollowingContext)
  const { players } = useContext(PlayerContext)

  const [playerIdsFollowed, setPlayerIdsFollowed] = useState([])
  const [playersFollowed, setPlayersFollowed] = useState([])

  useEffect(()=>{
    getFullFollowings()
  },[])
  useEffect(()=>{
    const playersFollowed = fullFollowings.map(ff => {
      if(ff.userId === props.currentUserId){
        return ff.player
      }
    })|| []
    setPlayersFollowed(playersFollowed)
  }, [players])

  const refreshPage = ()=>{
    window.location.reload();
  }

  const handleClick = (playerId) => {
    props.history.push(`/players/${playerId}`)
    refreshPage()
  }

  if (playersFollowed.length < 1) {
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
