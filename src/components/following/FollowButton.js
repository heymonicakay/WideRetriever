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
  const [followConnectionTBD, setFollowConnectionTBD] = useState({})
//EFFECT
const playerId = parseInt(props.match.params.playerId)

    useEffect(()=>{
        fullFollowings.forEach(ff => {
        if(props.currentUserId === ff.userId && props.playerId === ff.player.id ) {
            setIAmFollowing(true)
            setFollowConnectionTBD(ff)
        }
        })
    }, [fullFollowings])

//HANDLE
    const createNewFollowConnection = () => {
        if(iAmFollowing){
        window.alert("you are already following this player")
        }
        else {
            const newFollowConnection = {
                userId: props.currentUserId,
                playerId: props.playerId
            }
            addFollowing(newFollowConnection)
            .then(getFullFollowings)
        }
    }
//RETURN
const FollowButtonValidation = () => {
    if(!props.isOwner){
        return (
            <>
            <dialog className="unf-check" ref={unfollowDialog}>
                <div className="msg--unf-check">
                    Are you sure you want to unfollow {props.player.name}?
                </div>
                <div className="cont__dialog-btns--unf-check">
                    <div className="unfollow-sure" onClick={e => {
                        e.preventDefault()
                        unfollow(followConnectionTBD.id)
                        .then(getFullFollowings)
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
}
return (
    <>
    <FollowButtonValidation />
    </>
)
}