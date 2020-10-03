import React, { useState, useContext } from "react"
import { FollowingContext } from "../following/FollowingProvider"
import "./PlayerSearchResult.css"

export const PlayerSearchResult = ( props ) => {
  //useContext
  const { createNewFollowConnection } = useContext(FollowingContext)

  // refreshes page when user selects player from search dropdown
  const refreshPage = ()=>{
    window.location.reload();
  }

  // updates value of 'searchTerms' var
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
    </div>
  )
}