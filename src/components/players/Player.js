import React from "react"
import { Link } from "react-router-dom"
import "./Player.css"

export const Player = ( props ) => (
  <section className="pl-card pl-card-dash">
    <Link className="cont--img" to={`/players/${props.player.id}`}>
      <img className="pl-card--img" alt="" src={props.player.playerImg}/>
    </Link>
  </section>
)