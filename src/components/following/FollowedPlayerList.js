import React, { useContext, useState, useEffect } from "react"
import { FollowingContext } from "./FollowingProvider"
import { PlayerContext } from "../players/PlayerProvider";
import { FollowedPlayerCard } from "./FollowedPlayerCard"
import "./Following.css"

export const FollowedPlayerList = props => {

  const { fullFollowings, getFullFollowings, currentUserFollowings, getUserFollowings } = useContext(FollowingContext)
  const { getPlayers , players} = useContext(PlayerContext)

  const [playerIdsFollowed, setPlayerIdsFollowed] = useState([])
  const [playersFollowed, setPlayersFollowed] = useState([])

  const currentUserId = parseInt(sessionStorage.getItem("wr__user"))

  useEffect(()=>{
    getFullFollowings()
  },[])
  useEffect(()=>{
    let array=[]
    fullFollowings.forEach(ff => {
      if(currentUserId === ff.userId) {
        array.push(ff.player)
      }
    })
    setPlayersFollowed(array)
  }, [fullFollowings])

  const refreshPage = ()=>{
    window.location.reload();
  }

  const handleClick = (playerId) => {
    props.history.push(`/players/${playerId}`)
    refreshPage()
  }

  if (playersFollowed === undefined) {
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
                currentUserId={currentUserId}
            />
          })
        }
      </div>
    </>
  )
  }
}
