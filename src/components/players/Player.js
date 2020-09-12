import React from "react"
import "./Player.css"

export const Player = ({ player }) => (
    <section className="pl-card">
        <h3 className="pl-card--name">
          {player.name}
        </h3>
      <section className="pl-card--details">
      <div className="pl-card--img">
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
    </section>
)