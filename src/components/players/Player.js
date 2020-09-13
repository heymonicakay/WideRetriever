import React from "react"
import { Link } from "react-router-dom"
import "./Player.css"

export const Player = ( {player} ) => (
  <section className="pl-card">
    <h3 className="h3 header pl-card__header--name">
      {player.name}
    </h3>
    <Link className="cont--img" to={`/players/${player.id}`}>
      <img className="pl-card--img" src={player.playerImg}/>
    </Link>
  </section>
)