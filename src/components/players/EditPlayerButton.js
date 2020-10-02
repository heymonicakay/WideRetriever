import React from "react"

export const EditPlayerButton = (props) => {

  return(

    <button className="btn" onClick={() => {
      props.history.push(`/players/edit/${props.playerId}`)}}>
      Edit Player
    </button>
  )
}