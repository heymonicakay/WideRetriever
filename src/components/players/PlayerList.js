import React, { useState, useContext, useEffect } from "react"
import { PlayerContext } from "./PlayerProvider"
import { Player } from "./Player"
import "./Player.css"

export const PlayerList = (props) => {
    const { getPlayers, players, searchTerms } = useContext(PlayerContext)

    const [filteredPlayers, setFiltered] = useState([])

    useEffect(() => {
        getPlayers()
    }, [])

    useEffect(() => {
      const matchingPlayers = players.filter(p => p.name.toLowerCase().includes(searchTerms.toLowerCase()))
      setFiltered(matchingPlayers)
  }, [searchTerms])

  useEffect(() => {
    setFiltered(players)
  }, [players])

    return (
        <article className="list list--pl">

          {filteredPlayers.map(p => {

              return <Player
                  key={p.id}
                  player={p}
              />
            })
        }
        </article>
    )
}

