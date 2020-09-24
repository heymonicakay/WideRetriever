import React, { useRef, useContext, useEffect, useState } from "react"
import { FollowingContext } from "../following/FollowingProvider"
import { PlayerContext } from "./PlayerProvider"
import "./Player.css"
import { PlaytimeList } from "../playtime/PlaytimeList"
import { PlaytimeGoalContext } from "../playtimeGoals/PlaytimeGoalProvider"
import { PlaytimeContext } from "../playtime/PlaytimeProvider"
import { TrainingList } from "../training/TrainingList"
import { ExerciseList } from "../exercise/ExerciseList"
import { ExerciseContext } from "../exercise/ExerciseProvider"
import { ExerciseGoalContext } from "../exerciseGoals/ExerciseGoalProvider"
import { TodaysProgress } from "../goals/TodaysProgress"
import { WeeksProgress } from "../goals/WeeksProgress"

export const PlayerDetails = ( props ) => {
  //useRef
  const unfollowDialog = useRef()

  //useContext
  const { userFollowings, currentUserId, addFollowing, unfollow, getUserFollowings } = useContext(FollowingContext)
  const { exercises, getExercises} = useContext(ExerciseContext)
  const { getPlayerById } = useContext(PlayerContext)
  const { playtimes, getPlaytimes} = useContext(PlaytimeContext)
  const { getExerciseGoals, exerciseGoals } = useContext(ExerciseGoalContext)

  //useState
  const [player, setPlayer] = useState({})
  const [playerExercises, setPlayerExercises] = useState([])
  const [playerExerciseGoal, setPlayerExerciseGoal] = useState([])
  const [playerPlaytimes, setPlayerPlaytimes] = useState([])
  const [exercisesThisWeek, setExercisesThisWeek] = useState([])
  const [playtimesThisWeek, setPlaytimesThisWeek] = useState([])
  const [exercisesToday, setExercisesToday] = useState([])
  const [playtimesToday, setPlaytimesToday] = useState([])
  const [iAmFollowing, setIAmFollowing] = useState(null)
  const [followConnectionTBD, setFollowConnectionTBD] = useState({})

  const playerId = parseInt(props.match.params.playerId)

  //define date vars
  const todayTimestamp = Date.now()
  // ---> returns alien timestamp 1600896829415
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')
  // ----> accepts a TIMESTAMP returns LOCAL date STRING  TIMESTAMP
  const current = new Date()
  // ----> returns date OBJECT
  // --------> Wed Sep 23 2020 16:33:08 GMT-0500 (Central Daylight Time)
  const weekstart = current.getDate() - current.getDay()
  const thisMonth = current.getMonth()
  // ----> returns week start DATE as INT
  // ---------> (subtracts todays 'day of the week' index from todays DATE
  const sun = new Date(current.setDate(weekstart))
  const mon = new Date(current.setDate(weekstart + 1))
  const tues = new Date(current.setDate(weekstart + 2))
  const wed = new Date(current.setDate(weekstart + 3))
  const thurs = new Date(current.setDate(weekstart + 4))
  const fri = new Date(current.setDate(weekstart + 5))
  const sat = new Date(current.setDate(weekstart + 6))

  const thisSun = sun.getDate()
  const thisMon = mon.getDate()
  const thisTues = tues.getDate()
  const thisWed = wed.getDate()
  const thisThurs = thurs.getDate()
  const thisFri = fri.getDate()
  const thisSat = sat.getDate()

  //useEffect
  useEffect(() => {
      getPlayerById(playerId)
        .then(setPlayer)
  }, [])

  useEffect(() => {
    getUserFollowings(currentUserId)
    getExercises()
    getPlaytimes()
    getExerciseGoals()
  }, [])

  useEffect(() => {
    const alreadyFollowing = userFollowings.find(uf => uf.followedPlayerId === player.id)
    setIAmFollowing(alreadyFollowing)
  }, [userFollowings])

  useEffect(()=>{
    const playerExercises = exercises.filter(ex => ex.playerId === player.id) || []
    setPlayerExercises(playerExercises)
  }, [exercises])

  useEffect(()=>{
  const playerExerciseGoal = exerciseGoals.filter(eg => eg.assignedPlayerId === playerId) || []
  const goal = playerExerciseGoal[0] || {}
  setPlayerExerciseGoal(playerExerciseGoal[0])
}, [exerciseGoals])

  useEffect(()=>{
    const playerPlaytimes = playtimes.filter(pt => pt.playerId === player.id) || []
    setPlayerPlaytimes(playerPlaytimes)
  }, [playtimes])

  useEffect(()=> {
    const todaysExercises = playerExercises.filter(pe => pe.date === today) || []
    setExercisesToday(todaysExercises)
    }, [playerExercises])

  useEffect(()=> {
    const todaysPlaytimes = playerPlaytimes.filter(pp => pp.date === today) || []
    setPlaytimesToday(todaysPlaytimes)
    }, [playerPlaytimes])

  useEffect(() => {
    const thisWeeksEx = playerExercises.map(e => {
      const exDate = new Date(e.timestamp).getDate()
      if( exDate === thisSun || thisMon || thisTues || thisWed || thisThurs || thisFri || thisSat ) {
        return e
      }
    }) || []
  setExercisesThisWeek(thisWeeksEx)
  }, [playerExercises])

  useEffect(() => {
    const thisWeeksPt = playerPlaytimes.map(e => {
      const ptDate = new Date(e.timestamp).getDate()
      if( ptDate === thisSun || thisMon || thisTues || thisWed || thisThurs || thisFri || thisSat ) {
        return e
      }
    }) || []
    console.log(thisWeeksPt)
  setPlaytimesThisWeek(thisWeeksPt)
  }, [playerPlaytimes])

  useEffect(()=>{
    const followConnection = userFollowings.find(uf => uf.followedPlayerId === player.id) || {}
    setFollowConnectionTBD(followConnection.id)
  }, [userFollowings])

/* ----> MATH */
const findSum = (arr) => {
  let total = 0
    arr.forEach(k => {
      total += k
    })
  return total
  }
  const catchesArray = playerPlaytimes.map(pp=> pp.catches) || []
  const missesArray = playerPlaytimes.map(pp => pp.misses) || []
  const tossesArray = playerPlaytimes.map(pp => pp.catches + pp.misses) || []
  const successRate = (findSum(catchesArray) / findSum(tossesArray)).toLocaleString("en", {style: "percent"}) || 0
/****************************** CREATE new follow */
  const createNewFollowConnection = () => {
    const newFollowConnection = {
        userId: currentUserId,
        followedPlayerId: player.id
    }
    addFollowing(newFollowConnection)
    .then(getUserFollowings(currentUserId))
  }
/*************************************** FORCE RELOAD FUNC */
  const refreshPage = ()=>{
    window.location.reload();
  }

  const playerValidation = () => {
    // if the player belongs to the active user, afford EDIT
    if(currentUserId === player.userId) {
      return (
        <>
  <>{/***************** PLAYER DETAILS - PLAYER OWNED BY USER*/ }</>
          <div className="player-detail-container">
          <section className="pl-card pl-card-det-sec">
            <div className="pl-card-top">

              <div className="cont--img cont--img--detail">
                <img className="pl-card--img pl-card-img-detail" alt="" src={player.playerImg}/>
              </div>

              <section className="pl-card--details">
                <h1 className="h1 header pl-card__header--name">
                {player.name}
                </h1>
                <div className="pl-card--breed">
                  Breed: {player.breed}
                </div>
                <div className="pl-card--age">
                  Age: {player.age}
                </div>
                <div className="pl-card--catch-success">
                  Catch Percentage: {successRate}
                </div>
              </section>
              <section className="daily-progress-section">
                <TodaysProgress
                player={player}
                exercisesToday={exercisesToday}
                playtimesToday={playtimesToday}
                playerId={playerId}
                {...props}
                />
              </section>
              <section className="weekly-progress-section">
              <WeeksProgress
              player={player}
              exercisesThisWeek={exercisesThisWeek}
              playtimesThisWeek={playtimesThisWeek}
              />
              </section>
            </div>
            <div className="pl-card-bottom">
            <button className="btn" onClick={() => {
              props.history.push(`/players/edit/${player.id}`)
                }}>
              Edit Player
            </button>
            </div>
          </section>

  <>{/********************************** ADD'L PLAYER DETAILS*/}</>
        <div className="activity-section">
          <section className="pl-pt-list">
            <PlaytimeList
            player={player}
            playtimesThisWeek={playtimesThisWeek}
            {...props} />
          </section>

          <section className="pl-tr-list">
            <TrainingList {...props} />
          </section>

          <section className="pl-ex-list">
            <ExerciseList
            player={player}
            playerExercises={playerExercises}
            exercisesThisWeek={exercisesThisWeek}
            exercisesToday={exercisesToday}
            playerId={playerId}
            playerExerciseGoal={playerExerciseGoal}
            { ...props}>
            </ExerciseList>
          </section>
        </div>
      </div>
    </>
  )
  }
    else {
      //if player does NOT belong to the user, afford FOLLOW && UNFOLLOW
      return (
        <>
  <>{/************************************* DIALOG - UNFOLLOW DOUBLE CHECK*/ }</>
          <dialog className="dialog dialog--unf-check" ref={unfollowDialog}>
            <div className="cont__dialog-msg--unf-check">
              Are you sure you want to unfollow {player.name}?
            </div>
            <div className="cont__dialog-btns--unf-check">
              <button className="btn btn-unfollow-sure"
                onClick={e => {
                    e.preventDefault()
                    unfollow(followConnectionTBD)
                    .then(getUserFollowings(currentUserId))
                    unfollowDialog.current.close()
                }}>
                        Yes, I'm sure.
              </button>
              <button className="btn btn-unf--nvm" onClick={e => unfollowDialog.current.close()}>
                  Actually, nevermind.
              </button>
            </div>
          </dialog>
  <>{/************ PLAYER DETAILS - PLAYER NOT OWNED BY USER*/}</>
          <div className="player-detail-section">
            <section className="pl-card pl-card-det-sec">
            <div className="pl-card-top">
              <div className="cont--img cont--img--detail">
                <img className="pl-card--img pl-card-img-detail" alt="" src={player.playerImg}/>
              </div>
              <section className="pl-card--details">
              <h1 className="h1 header pl-card__header--name-det-sec">
                {player.name}
              </h1>
                <div className="pl-card--breed">
                  Breed: {player.breed}
                </div>
                <div className="pl-card--age">
                  Age: {player.age}
                </div>
  <>{/***************** ALREADY FOLLOWING TERNARY STATEMENT*/}</>
              {iAmFollowing
                ?
                  <>
                    <button className="btn btn--unfollow" onClick={() => {
                      unfollowDialog.current.showModal()
                    }}>
                      Unfollow {player.name}
                    </button>
                  </>
                :
                  <>
                    <button className="btn btn--follow" onClick={(e) => {
                        e.preventDefault()
                        createNewFollowConnection()
                    }}>
                      Follow {player.name}
                    </button>
                  </>
              }
            </section>
            </div>
          </section>

  <>{/***************************************************** ADD'L PLAYER DETAILS*/}</>

      <div className="activity-section">
          <section className="pl-pt-list">
            <PlaytimeList
            player={player}
            playerPlaytimes={playerPlaytimes}
            playtimesThisWeek={playtimesThisWeek}
            playerId={playerId}
            {...props} />
          </section>

          <section className="pl-tr-list">
            <TrainingList
            player={player}
            {...props} />
          </section>

          <section className="pl-ex-list">
            <ExerciseList
            player={player}
            playerExercises={playerExercises}
            playerId={playerId}
            { ...props} />
          </section>
          </div>
          </div>
        </>
      )
    }
  }
  return (
    <>
    {playerValidation()}
    </>
  )
}