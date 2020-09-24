import React, { useState, useContext, useEffect } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { PlaytimeContext } from "./PlaytimeProvider"
import { Playtime } from "./Playtime"
import { PlaytimeGoalContext } from "../playtimeGoals/PlaytimeGoalProvider"
import "./Playtime.css"

export const PlaytimeList = (props) => {
  //useContext
    const { getPlaytimes, playtimes, removePlaytime} = useContext(PlaytimeContext)
    const { getPlayerById } = useContext(PlayerContext)
    const { getPlaytimeGoals, playtimeGoals } = useContext(PlaytimeGoalContext)

    //useState
    const [filteredPlaytimes, setFiltered] = useState([])
    const [player, setPlayer] = useState({})
    const [playerGoals, setPlayerGoals] = useState([])
    const [ goal, setGoal ] = useState({})
    const [isLoading, setIsLoading] = useState(null)

    //define ids
    const userId = parseInt(sessionStorage.getItem("wr__user"))
    const playerId = parseInt(props.match.params.playerId)
    const thisWeek = props.playtimesThisWeek.length

    //useEffect
    useEffect(() => {
        getPlayerById(playerId)
          .then(setPlayer)
    }, [])

    useEffect(() => {
      getPlaytimeGoals()
  }, [])

    useEffect(() => {
      getPlaytimes()
  }, [])

  useEffect(()=>{
    const playerGoals = playtimeGoals.filter(pg => pg.playerId === playerId) || []
    const goal = playerGoals[0] || {}
    setPlayerGoals(playerGoals[0])
    setGoal(goal)
  }, [playtimeGoals])

    useEffect(() => {
      const matchingPlaytimes = playtimes.filter(playtime => playtime.playerId === playerId)

      const orderedPlaytimes = matchingPlaytimes.reverse()

      setFiltered(orderedPlaytimes)
  }, [playtimes])

  //evaluates logged exercises and user:player relationship - displays data accordingly
  const playtimeListVerify = () => {
    if(filteredPlaytimes.length < 1 && userId === player.userId) {
      return (
        <>
          <div className="cont__list cont__list--pt">

            <h2 className="list__header list__header--pt">
              Playtime
            </h2>
            <div className="playtime-goals">
            Goal:
            <br />
            {goal.goalSet} per week.
            </div>
            <div className="playtime-acheived">
            Acheived:
            <br />
            {thisWeek}
            </div>
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
    if(filteredPlaytimes.length < 1 && userId !== player.userId) {
      return (
      <>
        <div className="cont__list cont__list--pl">
          <h2 className="list__header list__header--pl">
            Playtime
          </h2>
          <article className="list list--ex">
            <h1 className="h1 no-data-msg no-pl-msg">
              Woof!
            </h1>
            <h3 className="h5 no-data-msg no-pl-msg">
                {player.name} doesn't have any playtimes, yet!
            </h3>
          </article>
        </div>
      </>
    )
    }
    if ( userId !== player.userId ) {
      return (
        <>
        <div className="cont__list cont__list--pl">
          <h2 className="list__header list__header--pl">
            Playtime
          </h2>
          <article className="list list--pt">

            {filteredPlaytimes.map(pt => {

              return <Playtime {...props}
                key={pt.id}
                playtime={pt}
                removePlaytime={removePlaytime}
                userId={userId}
                playerId={playerId}
                />
            })
            }
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
            <div className="exercise-goals">
            Goal:
            <br />
            {goal.goalSet} per week.
            </div>
            <div className="playtime-acheived">
            Acheived:
            <br />
            {thisWeek}
            </div>
            <button className="btn btn--add-pt" onClick={
              () => props.history.push(`/players/playtime/add/${playerId}`)
            }>
              Add Playtime
            </button>
            <article className="list list--pt">

              {filteredPlaytimes.map(pt => {

              return <Playtime {...props}
              key={pt.id}
              playtime={pt}
              removePlaytime={removePlaytime}
              userId={userId}
              playerId={playerId}
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
