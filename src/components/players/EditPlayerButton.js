import React from "react"
import "./Player.css"
export const EditPlayerButton = (props) => {

  return(

    <button className="btn btn-edit-player" onClick={() => {
      props.history.push(`/players/edit/${props.playerId}`)}}>
      Edit Player
    </button>
  )
}