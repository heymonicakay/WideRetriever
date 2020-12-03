//IMPORTS
  import React, { useContext, useRef, useEffect, useState } from "react"
  import { FollowingContext } from "../following/FollowingProvider"
  import "../players/Player.css"

export const FollowButton = (props) => {
//REFS
  const unfollowDialog = useRef(null)
//CONTEXT
  const { fullFollowings, addFollowing, unfollow, getFullFollowings } = useContext(FollowingContext)
//STATE
  const [iAmFollowing, setIAmFollowing] = useState(false)
  const [followConnection, setFollowConnection] = useState({})
//EFFECT
    useEffect(()=>{
        fullFollowings.forEach(ff => {
            if(props.currentUserId === ff.userId && props.playerId === ff.player.id ) {
                setIAmFollowing(true)
                setFollowConnection(ff)
            }
            else{
                setIAmFollowing(false)
                const newFollowConnection = {
                    userId: props.currentUserId,
                    playerId: props.playerId
                }
                setFollowConnection(newFollowConnection)
            }
        })
    }, [fullFollowings])

//HANDLE
    const handleClick = () => {
        if(iAmFollowing){
            unfollowDialog.current.showModal()
        }
        else{
            addFollowing(followConnection)
            .then(getFullFollowings)
        }
    }

    const handleUnfollow = (e) => {
        e.preventDefault()
        unfollow(followConnection.id)
        .then(()=>{
            setFollowConnection({})
            unfollowDialog.current.close()
        })
    }

//RETURN
const FollowButtonValidation = () => {
    if(!props.isOwner){
        return (
            <>
            <dialog
            className="unf-check"
            ref={unfollowDialog}>
                <div
                className="msg--unf-check">
                    Are you sure you want to unfollow {props.player.name}?
                </div>
                <div
                className="cont__dialog-btns--unf-check">
                    <div
                    className="unfollow-sure"
                    onClick={handleUnfollow}>
                        Yes, I'm sure.
                    </div>
                    <div
                    className="unf--nvm"
                    onClick={e => unfollowDialog.current.close()}>
                            Actually, nevermind.
                    </div>
                </div>
            </dialog>
            <span
            className={`
            ${iAmFollowing
            ? "unfollow"
            : "follow"}
            `}
            onClick={handleClick}>
                {iAmFollowing
                ? "Unfollow"
                : "Follow"}
            </span>
        </>
        )
    }
    else{
        return null
    }
}
return (
    <>
    <FollowButtonValidation />
    </>
)
}