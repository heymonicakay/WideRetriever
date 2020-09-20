import React, { useContext, useState } from "react"
import { PlayerContext } from "./PlayerProvider"
import "./PlayerSearchResult.css"

export const PlayerSearchResult = ( props ) => {

  const refreshPage = ()=>{
    window.location.reload();
 }

  const [ setTerms ] = useState("")

  return (
    <div className="pl-search-res" onClick={()=>{
      props.history.push(`/players/${props.player.id}`)
      refreshPage()
      setTerms("")
      }}>

      <div className="pl-search-res--c1">
        <img className="pl-search-res--img" src={props.player.playerImg}/>
      </div>
      <div className="pl-search-res--c2">
        <div className="pl-search-res--name">
        {props.player.name}
        </div>
      </div>
      <div className="pl-search-res--c3">
          <div className="btn--pl-search-res btn--pl-search-res--follow">
            +
          </div>
      </div>
    </div>
  )
}