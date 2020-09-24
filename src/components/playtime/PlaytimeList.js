import React, { useRef, useState, useContext, useEffect } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { PlaytimeContext } from "./PlaytimeProvider"
import { Playtime } from "./Playtime"
import { PlaytimeGoalContext } from "../playtimeGoals/PlaytimeGoalProvider"
import "./Playtime.css"

export const PlaytimeList = (props) => {
  //refs
  const goalSet = useRef(null)

  //useContext
    const { getPlaytimes, playtimes, removePlaytime} = useContext(PlaytimeContext)
    const { getPlayerById } = useContext(PlayerContext)
    const { getPlaytimeGoals, playtimeGoals, editPlaytimeGoal } = useContext(PlaytimeGoalContext)

    //useState
    const [filteredPlaytimes, setFiltered] = useState([])
    const [player, setPlayer] = useState({})
    const [playerPlaytimeGoal, setPlayerPlaytimeGoal] = useState([])
    const [editMode, setEditMode] = useState(false)
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
    const playerPlaytimeGoal = playtimeGoals.filter(pg => pg.playerId === playerId) || []
    const goal = playerPlaytimeGoal[0] || {}
    setPlayerPlaytimeGoal(goal)
    // setGoal(goal)
  }, [playtimeGoals])

    useEffect(() => {
      const matchingPlaytimes = playtimes.filter(playtime => playtime.playerId === playerId)

      const orderedPlaytimes = matchingPlaytimes.reverse()

      setFiltered(orderedPlaytimes)
  }, [playtimes])

  const toggleEditMode = () => {
    if (editMode === true) {
      setEditMode(false)
    }
    else {
      setEditMode(true)
    }
  }

  const handleControlledInputChange = (e) => {
    const newPlayerPlaytimeGoal = Object.assign({}, playerPlaytimeGoal)
    newPlayerPlaytimeGoal[e.target.name] = e.target.value
    setPlayerPlaytimeGoal(newPlayerPlaytimeGoal)
  }
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')

  const constructNewPlaytimeGoal = () => {
    //define player ID

    {editPlaytimeGoal({
      id: props.playerPlaytimeGoal.id,
      playerId: playerId,
      goalSet: playerPlaytimeGoal.goalSet,
      timestamp:Date.now(),
      date: today,
    })
    .then(() => props.history.push(`/players/${playerId}`))}
  }
  //evaluates logged exercises and user:player relationship - displays data accordingly
  const playtimeListVerify = () => {
    if(filteredPlaytimes.length < 1 && userId === player.userId) {
      return (
        <>
          <div className="cont__list cont__list--pt">

            <h2 className="list__header list__header--pt">
              Playtime
            </h2>
            {editMode
            ?<>
            <select defaultValue="" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange}>
                <option value="0">0</option>
                <option value="1">1 day a week</option>
                <option value="2">2 days a week</option>
                <option value="3">3 days a week</option>
                <option value="4">4 days a week</option>
                <option value="5">5 days a week</option>
                <option value="6">6 days a week</option>
                <option value="7">7 days a week</option>
              </select>

              <button className="btn btn--submit btn--ex" type="button"
              onClick={e => {
                e.preventDefault()
                constructNewPlaytimeGoal()
                toggleEditMode()
              }}>
              Update Goal!
              </button>
            </>
            :
            <>
            <div className="exercise-goals" onClick={toggleEditMode}>
              Goal:
              <br />
              {playerPlaytimeGoal.goalSet}
              </div>

              <div className="playtime-acheived">
            Acheived:
            <br />
            {thisWeek}
            </div>
            </>
            }
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
            {editMode
            ?
            <>
                <select defaultValue="" ref={goalSet} name="goalSet" className="input input--ex input--goalSet" onChange={handleControlledInputChange}>
              <option value="0">0</option>
              <option value="1">1 day a week</option>
              <option value="2">2 days a week</option>
              <option value="3">3 days a week</option>
              <option value="4">4 days a week</option>
              <option value="5">5 days a week</option>
              <option value="6">6 days a week</option>
              <option value="7">7 days a week</option>
            </select>

            <button className="btn btn--submit btn--ex" type="button"
              onClick={e => {
                e.preventDefault()
                constructNewPlaytimeGoal()
                toggleEditMode()
              }}>
              Update Goal!
              </button>
            </>
            :
            <>
              <div className="exercise-goals" onClick={toggleEditMode}>
              Goal:
              <br />
              {playerPlaytimeGoal.goalSet} per week.
              </div>

              <div className="playtime-acheived">
              Acheived:
              <br />
              {thisWeek}
              </div>
            </>
            }
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
