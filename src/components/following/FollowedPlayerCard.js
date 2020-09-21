import React, { useContext, useState, useEffect } from "react"
import { FollowingContext } from "./FollowingProvider"

export const FollowedPlayerCard = ( props ) => {

    const [followConnectionToBeDeleted, setFollowConnectionTBD] = useState({})
    const { following, unfollow } = useContext(FollowingContext)
    const activeUser = parseInt(sessionStorage.getItem("wr__user"))

    const findFollowConnection = () => {
      const followConnection = following.find(f => f.followedPlayerId === props.player.id && f.userId === activeUser)
      setFollowConnectionTBD(followConnection)
    }
    useEffect(() => {
      unfollow(followConnectionToBeDeleted.id)
    }, [followConnectionToBeDeleted])

    return (
      <section className="followed-player-card">
        <div className="followed-player-card--c1">
          <img className="followed-player-img" alt="" src={props.player.playerImg}/>
        </div>

        <div className="followed-player-card--c2">
          {props.player.name}
        </div>
        <div className="followed-player-card--c3">
          <button className="btn btn-unfollow"
            onClick={
                e => {
                    e.preventDefault()
                    findFollowConnection()
                }
            }>
              Unfollow {props.player.name}
          </button>
        </div>
      </section>
    )
}