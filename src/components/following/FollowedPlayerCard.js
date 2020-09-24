import React from "react"

export const FollowedPlayerCard = ( props ) => {
    return (
      <>
        <div className="followed-player-card-cont"
          onClick={(e)=>{
            props.handleClick(e)
            props.refreshPage()}}>
          <img className="followed-player-img" alt="" src={props.player.playerImg}/>
          <div className="followed-player-pop-out--name">
              {props.player.name}
          </div>
        </div>
      </>
    )
}