import React, { useState, useContext, useEffect } from "react"
import { PlaytimeContext } from "./PlaytimeProvider"
import { Playtime } from "./Playtime"
import "./Playtime.css"

export const PlaytimeList = (props) => {
    const { getPlaytimes, playtimes } = useContext(PlaytimeContext)


    const [filteredPlaytimes, setFiltered] = useState([])

    const playerId = parseInt(props.match.params.playerId)

    useEffect(() => {
      getPlaytimes()
  }, [])

    useEffect(() => {

      const matchingPlaytimes = playtimes.filter(playtime => playtime.playerId === playerId)
      console.log(matchingPlaytimes, "matching playtimes")
      setFiltered(matchingPlaytimes)
  }, [playtimes])


    return (
      <>
      <div className="cont__list cont__list--pt">

        <h2 className="list__header list__header--pt">
          Playtime
        </h2>
        <button className="btn btn--add-pt">
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

