import React, { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom";
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

    const [isHidden, setIsHidden] = useState(true)

    const refreshPage = ()=>{
      window.location.reload();
    }

    const toggleHidden = () => {
      if(isHidden === true) {
        setIsHidden(false)
      }
      else {
        setIsHidden(true)
      }
    }

    return (
      <>
        <div className="followed-player-card-cont">
          <img className="followed-player-img" alt="" src={props.player.playerImg} onClick={()=>{
            toggleHidden()
          }}/>

          {isHidden
            ? (null)
            : <>
                <div className="followed-player-pop-out">
                <div className="followed-player-pop-out--name" onClick={()=>{
                  props.history.push(`/players/${props.player.id}`)
                  refreshPage()}}
                  >
                  {props.player.name}
                </div>
                <div className="followed-player-pop-out--group">
                  <div className="btn--unfollow--img-cont">

                  <img className="btn--unfollow--img" src="https://res.cloudinary.com/heymonicakay/image/upload/c_scale,w_25/a_45/v1600707315/wideRetriever/x-icon-circle_f15cui.png" alt=""
                    onClick={e => {
                      e.preventDefault()
                      findFollowConnection()
                    }} />
                    </div>
                </div>
              </div>
            </>
          }
        </div>
      </>
    )
}