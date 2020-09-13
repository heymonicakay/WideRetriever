import React, { useContext, useEffect, useState } from "react"
import { PlayerContext } from "./PlayerProvider"
import "./Player.css"

export const PlayerDetails = (props) => {
    const { removePlayer, getPlayerById } = useContext(PlayerContext)

    const [player, setPlayer] = useState({})

    useEffect(() => {
        const playerId = parseInt(props.match.params.playerId)
        getPlayerById(playerId)
            .then(setPlayer)
    }, [])

    return (
      <section className="pl-card">
        <h3 className="h3 header pl-card__header--name">
          {player.name}
        </h3>
        <section className="pl-card--details">
          <div className="cont--img">
            <img className="pl-card--img" src={player.playerImg}/>
          </div>
          <div className="pl-card--breed">
            Breed: {player.breed}
          </div>
          <div className="pl-card--age">
            Age: {player.age}
          </div>
          <div className="pl-card--number">
            Number: {player.number}
          </div>
        </section>
        <button className="btn" onClick={() => removePlayer(player.id).then(() => props.history.push("/players"))} >
          Remove Player
        </button>
        <button className="btn" onClick={() => {
          props.history.push(`/players/edit/${player.id}`)
            }}>
          Update Player
        </button>
      </section>
    )
}