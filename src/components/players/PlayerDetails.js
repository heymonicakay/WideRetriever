import React, { useRef, useContext, useEffect, useState } from "react"
import { PlayerContext } from "./PlayerProvider"
import "./Player.css"

import { PlaytimeList } from "../playtime/PlaytimeList"

import { TrainingList } from "../training/TrainingList"
import { ExerciseList } from "../exercise/ExerciseList"

export const PlayerDetails = (props) => {
  const delDialog = useRef()

  const { removePlayer, getPlayerById } = useContext(PlayerContext)

  const [player, setPlayer] = useState({})

  useEffect(() => {
    const playerId = parseInt(props.match.params.playerId)
      getPlayerById(playerId)
        .then(setPlayer)
  }, [])

  return (

    <>

      <dialog className="dialog dialog--del-check" ref={delDialog}>
        <div className="cont__dialog-msg--del-check">
          Woof! Are you sure you want to remove {player.name} from the roster?
        </div>

        <div className="cont__dialog-btns--del-check">
          <button className="btn btn-del--sure" onClick={() => removePlayer(player.id).then(() => props.history.push("/players"))}>
              Yes, I'm sure.
          </button>
          <button className="btn btn-del--nvm" onClick={e => delDialog.current.close()}>
              Actually, nevermind.
          </button>
        </div>
      </dialog>

        <section className="pl-card">
          <h1 className="h1 header pl-card__header--name">
            {player.name}
          </h1>
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

          <button className="btn" onClick={() => {
            props.history.push(`/players/edit/${player.id}`)
              }}>
            Edit Player
          </button>
          <button className="btn btn--red" onClick={() => {
            delDialog.current.showModal()
          }} >
            Remove From Roster
          </button>
        </section>

        <section className="pl-pt-list">
          <PlaytimeList {...props} />
        </section>

        <section className="pl-tr-list">
          <TrainingList {...props} />
        </section>

        <section className="pl-ex-list">
          <ExerciseList { ...props} />
        </section>
      </>
    )
}