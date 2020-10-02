//IMPORTS
  import React, { useContext, useRef, useEffect, useState } from "react"
  import { FollowingContext } from "../following/FollowingProvider"

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
    <dialog className="dialog dialog--unf-check" ref={unfollowDialog}>
      <div className="cont__dialog-msg--unf-check">
      Are you sure you want to unfollow {props.player.name}?
      </div>
      <div className="cont__dialog-btns--unf-check">
        <button className="btn btn-unfollow-sure" onClick={e => {
            e.preventDefault()
            unfollow(followConnectionTBD)
            .then(getUserFollowings(props.currentUserId))
            unfollowDialog.current.close()
        }}>
          Yes, I'm sure.
        </button>
        <button className="btn btn-unf--nvm"
              onClick={e => unfollowDialog.current.close()}>
                Actually, nevermind.
        </button>
      </div>
    </dialog>

    {iAmFollowing
    ?<>
      <button className="btn btn--unfollow" onClick={() => {
      unfollowDialog.current.showModal()
        }}>
        Unfollow {props.player.name}
      </button>
    </>
    :<>
      <button className="btn btn--follow" onClick={(e) => {
        e.preventDefault()
        createNewFollowConnection()
      }}>
        Follow {props.player.name}
      </button>
    </>
    }
  </>
  )
}