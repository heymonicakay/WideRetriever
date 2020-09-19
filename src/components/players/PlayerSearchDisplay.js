import React, { useState, useContext, useEffect } from "react"
import { PlayerContext } from "./PlayerProvider"
import { PlayerSearchResult } from "./PlayerSearchResult"
import "./Player.css"

export const PlayerSearchDisplay = (props) => {
  const { players, getPlayers, searchTerms} = useContext(PlayerContext)

  const [filteredPlayers, setFilteredPlayers] = useState([])

  useEffect(()=>{
    getPlayers()
  }, [])

  useEffect(() => {
    const matchingPlayers = players.filter(p => p.name.toLowerCase().includes(searchTerms.toLowerCase()))
    setFilteredPlayers(matchingPlayers)
    }, [searchTerms])

  useEffect(() => {
    setFilteredPlayers(players)
  }, [players])

    const resultVerify = () => {
      if(searchTerms.length < 1) {
        return (
          <span hidden></span>
        )
      }
      if(filteredPlayers.length < 1) {
        return (
          <div className="no-pl-found">
            Sorry, there aren't any Players by that name.
          </div>
        )
      }
      else {
        return (
          <>
            <div className="search-results-list">

              {filteredPlayers.map(p=>{
                return <PlayerSearchResult {...props}
                key={p.id}
                player={p}
                />
              })}
            </div>
          </>
        )
      }
    }
    return (
      <>
        {resultVerify()}
      </>
    )
}