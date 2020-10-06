//IMPORTS
  import React, { useContext, useRef, useEffect, useState } from "react"
  import { FollowingContext } from "../following/FollowingProvider"
  import "../players/Player.css"

export const FollowButton = (props) => {
//REFS
  const unfollowDialog = useRef(null)
//CONTEXT
  const { currentUserFollowings, addFollowing, unfollow, getUserFollowings } = useContext(FollowingContext)
//STATE
  const [iAmFollowing, setIAmFollowing] = useState(true)
  const [followConnectionTBD, setFollowConnectionTBD] = useState({})
//EFFECT
  useEffect(()=>{
    getUserFollowings(props.currentUserId)
  },[])
  useEffect(()=>{
    if(currentUserFollowings.includes(props.playerId)){
      setIAmFollowing(true)}
    const followConnection = currentUserFollowings.find(uf => uf.followedPlayerId === props.playerId) || {}
    setFollowConnectionTBD(followConnection.id)
  }, [currentUserFollowings, props.player])

//HANDLE
  const createNewFollowConnection = () => {
    if(iAmFollowing){
    window.alert("you are already following this player")}
  const newFollowConnection = {
      userId: props.currentUserId,
      followedPlayerId: props.playerId
    }
    addFollowing(newFollowConnection)
    .then(getUserFollowings(props.currentUserId))
  }
//RETURN
  return (
    <>
    <dialog className="unf-check" ref={unfollowDialog}>
      <div className="msg--unf-check">
      Are you sure you want to unfollow {props.player.name}?
      </div>
      <div className="cont__dialog-btns--unf-check">
        <div className="unfollow-sure" onClick={e => {
            e.preventDefault()
            unfollow(followConnectionTBD)
            .then(getUserFollowings(props.currentUserId))
            unfollowDialog.current.close()
        }}>
          Yes, I'm sure.
        </div>
        <div className="unf--nvm"
              onClick={e => unfollowDialog.current.close()}>
                Actually, nevermind.
        </div>
      </div>
    </dialog>

    {iAmFollowing
    ?<>
      <span className="unfollow" onClick={() => {
      unfollowDialog.current.showModal()
        }}>
        Unfollow
      </span>
    </>
    :<>
      <span className="follow" onClick={(e) => {
        e.preventDefault()
        createNewFollowConnection()
      }}>
        Follow
      </span>
    </>
    }
  </>
  )
}