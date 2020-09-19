import React, { useState, useContext, useEffect } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { PlaytimeContext } from "./PlaytimeProvider"
import { Playtime } from "./Playtime"
import "./Playtime.css"

export const PlaytimeList = (props) => {
    const { getPlaytimes, playtimes } = useContext(PlaytimeContext)
    const { getPlayerById } = useContext(PlayerContext)


    const [filteredPlaytimes, setFiltered] = useState([])
    const [player, setPlayer] = useState({})


    const playerId = parseInt(props.match.params.playerId)

    useEffect(() => {
      const playerId = parseInt(props.match.params.playerId)
        getPlayerById(playerId)
          .then(setPlayer)
    }, [])
    useEffect(() => {
      getPlaytimes()
  }, [])

    useEffect(() => {

      const matchingPlaytimes = playtimes.filter(playtime => playtime.playerId === playerId)
      const orderedPlaytimes = matchingPlaytimes.reverse()

      setFiltered(orderedPlaytimes)
  }, [playtimes])

  const playtimeListVerify = () => {
    if(filteredPlaytimes.length < 1) {
      return (
        <>
          <div className="cont__list cont__list--pt">

            <h2 className="list__header list__header--pt">
              Playtime
            </h2>
            <button className="btn btn--add-pt" onClick={
              () => props.history.push(`/players/playtime/add/${playerId}`)
            }>
              Add Playtime
            </button>
            <article className="list list--pt">
            <h1 className="h1 no-data-msg no-pt-msg">
              Woof!
            </h1>
            <h3 className="h5 no-data-msg no-pt-msg">
                {player.name} doesn't have any playtimes, yet!
            </h3>
          </article>
          </div>
        </>
      )
    }
    else {
      return (
        <>
          <div className="cont__list cont__list--pt">

            <h2 className="list__header list__header--pt">
              Playtime
            </h2>
            <button className="btn btn--add-pt" onClick={
              () => props.history.push(`/players/playtime/add/${playerId}`)
            }>
              Add Playtime
            </button>
            <article className="list list--pt">

              {filteredPlaytimes.map(pt => {

              return <Playtime
              key={pt.id}
              playtime={pt}
              />
              })
              }
            </article>
          </div>
        </>
      )
    }
  }

  return (
    <>
      {playtimeListVerify()}
    </>
  )
}
