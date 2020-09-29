import React, { useRef, useContext, useEffect, useState } from "react"
import { FollowingContext } from "../following/FollowingProvider"
import { PlayerContext } from "./PlayerProvider"
import "./Player.css"
import { PlaytimeContext } from "../playtime/PlaytimeProvider"
  import { PlaytimeList } from "../playtime/PlaytimeList"
  import { PlaytimeGoalContext } from "../playtimeGoals/PlaytimeGoalProvider"
import { TrainingContext } from "../training/TrainingProvider"
  import { TrainingList } from "../training/TrainingList"
  import { TrainingGoalContext } from "../trainingGoals/TrainingGoalProvider"
import { ExerciseContext } from "../exercise/ExerciseProvider"
  import { ExerciseList } from "../exercise/ExerciseList"
  import { ExerciseGoalContext } from "../exerciseGoals/ExerciseGoalProvider"
import { TodaysProgress } from "../goals/TodaysProgress"
import { WeeksProgress } from "../goals/WeeksProgress"

export const PlayerDetails = ( props ) => {
  //useRef
  const unfollowDialog = useRef()

  //useContext
    const { currentUserFollowings, addFollowing, unfollow, getUserFollowings } = useContext(FollowingContext)
    const { getPlayerById } = useContext(PlayerContext)
    const { playtimes, getPlaytimes} = useContext(PlaytimeContext)
    const { trainings, getTrainings } = useContext(TrainingContext)
    const { exercises, getExercises} = useContext(ExerciseContext)
    const { getPlaytimeGoals, playtimeGoals } = useContext(PlaytimeGoalContext)
    const { getTrainingGoals, trainingGoals } = useContext(TrainingGoalContext)
    const { getExerciseGoals, exerciseGoals } = useContext(ExerciseGoalContext)

  //useState
  //PLAYER
    const [player, setPlayer] = useState({})
  //EXERCISE
    const [playerExercises, setPlayerExercises] = useState([])
    const [exercisesToday, setExercisesToday] = useState([])
    const [exercisesThisWeek, setExercisesThisWeek] = useState([])
    const [playerExerciseGoal, setPlayerExerciseGoal] = useState([])
  //PLAYTIMES
    const [playerPlaytimes, setPlayerPlaytimes] = useState([])
    const [playtimesToday, setPlaytimesToday] = useState([])
    const [playtimesThisWeek, setPlaytimesThisWeek] = useState([])
    const [playerPlaytimeGoal, setPlayerPlaytimeGoal] = useState([])
  //TRAININGS
    const [playerTrainings, setPlayerTrainings] = useState([])
    const [trainingsToday, setTrainingsToday] = useState([])
    const [trainingsThisWeek, setTrainingsThisWeek] = useState([])
    const [playerTrainingGoal, setPlayerTrainingGoal] = useState([])
  //FOLLOWING
    const [iAmFollowing, setIAmFollowing] = useState(true)
    const [followConnectionTBD, setFollowConnectionTBD] = useState({})

  const playerId = parseInt(props.match.params.playerId)

  //define date vars
  //TODAY
    const todayTimestamp = Date.now() /* (TIMESTAMP) => date STRING */
    const today = new Date(todayTimestamp).toLocaleDateString('en-US')
    const current = new Date() /* => date OBJECT | Ex: Wed Sep 23 2020 16:33:08 GMT-0500 (Central Daylight Time)*/
  //THIS WEEK
  const weekstart = current.getDate() - current.getDay() /*=> week start DATE as INT */
  const sun = new Date(current.setDate(weekstart)) /* sets WEEKS to current week */
    const mon = new Date(current.setDate(weekstart + 1)) /* */
    const tues = new Date(current.setDate(weekstart + 2)) /* */
    const wed = new Date(current.setDate(weekstart + 3)) /* */
    const thurs = new Date(current.setDate(weekstart + 4)) /* */
    const fri = new Date(current.setDate(weekstart + 5)) /* */
    const sat = new Date(current.setDate(weekstart + 6)) /* */

  const thisSun = sun.getDate() /* gets DATES for each day of current week*/
    const thisMon = mon.getDate()
    const thisTues = tues.getDate()
    const thisWed = wed.getDate()
    const thisThurs = thurs.getDate()
    const thisFri = fri.getDate()
    const thisSat = sat.getDate()

  const thisMonth = current.getMonth() /* */

  //useEffect
  useEffect(() => {
      getPlayerById(playerId)
        .then(setPlayer)
  }, []) /* get/set player OBJECT*/

  useEffect(() => {
    getUserFollowings(props.currentUserId)
    getExercises()
    getPlaytimes()
    getTrainings()
    getPlaytimeGoals()
    getTrainingGoals()
    getExerciseGoals()
  }, []) /* fetches data: currentUserFollowings, exercises, playtimes, trainings, etc. */
  console.log(exerciseGoals, "exercise goals")
  useEffect(() => {
    const alreadyFollowing = currentUserFollowings.find(uf => uf.followedPlayerId === player.id)
  setIAmFollowing(alreadyFollowing)
  }, [currentUserFollowings]) /* determines if current user is following target player */
  useEffect(()=>{
    const playerPlaytimes = playtimes.filter(pt => pt.playerId === player.id) || []
  setPlayerPlaytimes(playerPlaytimes)
  }, [playtimes]) /* sets ALL PLAYTIMES ARRAY for target player */

  useEffect(()=>{
    const playerTrainings = trainings.filter(tr => tr.playerId === player.id) || []
  setPlayerTrainings(playerTrainings)
  }, [trainings]) /* sets ALL TRAININGS ARRAY for target player */
  useEffect(()=>{
    const playerExercises = exercises.filter(ex => ex.playerId === player.id) || []
  setPlayerExercises(playerExercises)
  }, [exercises]) /* sets ALL EXERCISES ARRAY for target player */

  useEffect(()=>{
    const playerPlaytimeGoal = playtimeGoals.filter(eg => eg.playerId === playerId) || []
  setPlayerPlaytimeGoal(playerPlaytimeGoal[0])
  }, [playtimeGoals]) /* sets PLAYTIME GOAL OBJECT for target player */

  useEffect(()=>{
    const playerTrainingGoal = trainingGoals.filter(eg => eg.playerId === playerId) || []
  setPlayerTrainingGoal(playerTrainingGoal[0])
  }, [trainingGoals]) /* sets TRAINING GOAL OBJECT for target player */

  useEffect(()=>{
    const playerExerciseGoal = exerciseGoals.find(eg => eg.playerId === playerId) || {}
  setPlayerExerciseGoal(playerExerciseGoal)
  }, [exerciseGoals]) /* sets EXERCISE GOAL OBJECT for target player */
  console.log(playerExerciseGoal, "player exercise goal")
  useEffect(()=> {
    const todaysPlaytimes = playerPlaytimes.filter(pt => pt.date === today) || []
  setPlaytimesToday(todaysPlaytimes)
  }, [playerPlaytimes]) /* sets TODAYS PLAYTIMES ARRAY for target player */

  useEffect(()=> {
    const todaysTrainings = playerTrainings.filter(tr => tr.date === today) || []
  setTrainingsToday(todaysTrainings)
  }, [playerTrainings]) /* sets TODAYS TRAININGS ARRAY for target player */
  useEffect(()=> {
    const todaysExercises = playerExercises.filter(pe => pe.date === today) || []
  setExercisesToday(todaysExercises)
  }, [playerExercises]) /* sets TODAYS EXERCISES ARRAY for target player */

  useEffect(() => {
    const thisWeeksTr = playerTrainings.map(e => {
      const trDate = new Date(e.timestamp).getDate()
      if( trDate === thisSun || thisMon || thisTues || thisWed || thisThurs || thisFri || thisSat ) {
        return e
      }
    }) || []
  setTrainingsThisWeek(thisWeeksTr)
  }, [playerTrainings]) /* sets this WEEKS TRAININGS ARRAY for target player */

  useEffect(() => {
    const thisWeeksEx = playerExercises.map(e => {
      const exDate = new Date(e.timestamp).getDate()
      if( exDate === thisSun || thisMon || thisTues || thisWed || thisThurs || thisFri || thisSat ) {
        return e
      }
    }) || []
  setExercisesThisWeek(thisWeeksEx)
  }, [playerExercises]) /* sets this WEEKS EXERCISES ARRAY for target player */

  useEffect(() => {
    const thisWeeksPt = playerPlaytimes.map(e => {
      const ptDate = new Date(e.timestamp).getDate()
      if( ptDate === thisSun || thisMon || thisTues || thisWed || thisThurs || thisFri || thisSat ) {
        return e
      }
    }) || []
  setPlaytimesThisWeek(thisWeeksPt)
  }, [playerPlaytimes]) /* sets this WEEKS PLAYTIMES ARRAY for target player */

  useEffect(()=>{
    const followConnection = currentUserFollowings.find(uf => uf.followedPlayerId === player.id) || {}
    setFollowConnectionTBD(followConnection.id)
  }, [currentUserFollowings]) /* finds follow connection to be deleted */

  const findSum = (arr) => {
    let total = 0
      arr.forEach(k => {
        total += k
      })
    return total
  } /* ----> MATH */
  const catchesArray = playerPlaytimes.map(pp=> pp.catches) || []
  const tossesArray = playerPlaytimes.map(pp => pp.catches + pp.misses) || []
  const successRate = (findSum(catchesArray) / findSum(tossesArray)).toLocaleString("en", {style: "percent"}) || 0

  const createNewFollowConnection = () => {
    const newFollowConnection = {
        userId: props.currentUserId,
        followedPlayerId: player.id
    }
    addFollowing(newFollowConnection)
    .then(getUserFollowings(props.currentUserId))
  } /* CREATE new follow connection */
  const refreshPage = ()=>{
    window.location.reload();
  } /* force refresh */

  console.log(playerExerciseGoal, "player ex goaal in player details")

  const playerValidation = () => {
    if(props.currentUserId === player.userId) {
      return (
        <>
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
                  player={ player }
                  exercisesToday={ exercisesToday }
                  playtimesToday={ playtimesToday }
                  playerId={ playerId }
                  currentUserId={ props.currentuserId }
                  {...props}
                />
              </section>
              <section className="weekly-progress-section">
              <WeeksProgress
                player={ player }
                playerId={ playerId }
                playtimesThisWeek={ playtimesThisWeek }
                trainingsThisWeek={ trainingsThisWeek }
                exercisesThisWeek={ exercisesThisWeek }
                currentUserId={ props.currentuserId }
              />
              </section>
            </div>
            <div className="pl-card-bottom">
            <button className="btn" onClick={() => {
              props.history.push(`/players/edit/${player.id}`)
                }}>
              Edit Player
            </button>
            <button className="btn" onClick={()=>{
              props.history.push(`/players/goals/playtime/add/${player.id}`)
            }}>
              Add Playtime Goal
            </button>
            <button className="btn" onClick={()=>{
              props.history.push(`/players/goals/training/add/${player.id}`)
            }}>
              Add Training Goal
            </button>
            <button className="btn" onClick={()=>{
            props.history.push(`/players/goals/exercise/add/${player.id}`)
            }}>
              Add Exercise Goal
            </button>

            </div>
          </section>
        <div className="activity-section">
          <section className="pl-pt-list">
            <PlaytimeList
              player={ player }
              playerId={ playerId }
              playerPlaytimeGoal={ playerPlaytimeGoal }
              playerPlaytimes={ playerPlaytimes }
              playtimesToday={ playtimesToday }
              playtimesThisWeek={ playtimesThisWeek }
              today={ today }
              todayTimestamp={ todayTimestamp }
              currentUserId={ props.currentuserId }
            {...props} />
          </section>

          <section className="pl-tr-list">
            <TrainingList
              player={player}
              playerId={playerId}
              playerTrainingGoal={ playerTrainingGoal }
              playerTrainings={ playerTrainings }
              trainingsToday={ trainingsToday }
              trainingsThisWeek={ trainingsThisWeek }
              today={ today }
              todayTimestamp={ todayTimestamp }
              currentUserId={ props.currentuserId }
            {...props} />
          </section>

          <section className="pl-ex-list">
            <ExerciseList
              player={ player }
              playerId={ playerId }
              playerExerciseGoal={ playerExerciseGoal }
              playerExercises={ playerExercises }
              exercisesToday={ exercisesToday }
              exercisesThisWeek={ exercisesThisWeek }
              today={ today }
              todayTimestamp={ todayTimestamp }
              currentUserId={ props.currentuserId }
            { ...props}>
            </ExerciseList>
          </section>
        </div>
      </div>
    </>
  )
  }
    else {
      return (
        <>
          <dialog className="dialog dialog--unf-check" ref={unfollowDialog}>
            <div className="cont__dialog-msg--unf-check">
              Are you sure you want to unfollow {player.name}?
            </div>
            <div className="cont__dialog-btns--unf-check">
              <button className="btn btn-unfollow-sure"
                onClick={e => {
                    e.preventDefault()
                    unfollow(followConnectionTBD)
                    .then(getUserFollowings(props.currentUserId))
                    unfollowDialog.current.close()
                }}>
                  Yes, I'm sure.
              </button>
              <button className="btn btn-unf--nvm"
                onClick={e => unfollowDialog.current.close()}>
                  Actually, nevermind.
              </button>
            </div>
          </dialog>
          <div className="player-detail-section">
            <section className="pl-card pl-card-det-sec">
              <div className="pl-card-top">
                <div className="cont--img cont--img--detail">
                  <img className="pl-card--img pl-card-img-detail"
                    alt=""
                    src={player.playerImg}/>
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
                  {iAmFollowing
                  ? <>
                    <button className="btn btn--unfollow"
                      onClick={() => {
                        unfollowDialog.current.showModal()
                      }}>
                        Unfollow {player.name}
                    </button>
                    </>
                  : <>
                    <button className="btn btn--follow"
                      onClick={(e) => {
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
            <div className="activity-section">
              <section className="pl-pt-list">
                <PlaytimeList
                  player={player}
                  playerId={playerId}
                  playerPlaytimes={playerPlaytimes}
                  playtimesThisWeek={playtimesThisWeek}
                  today={ today }
                  todayTimestamp={ todayTimestamp }
                  currentUserId={ props.currentuserId }
                {...props} />
              </section>

              <section className="pl-tr-list">
                <TrainingList
                  player={player}
                  playerId={playerId}
                  playerTrainings={ playerTrainings }
                  trainingsThisWeek={ trainingsThisWeek }
                  today={ today }
                  todayTimestamp={ todayTimestamp }
                  currentUserId={ props.currentuserId }
                {...props} />
              </section>

              <section className="pl-ex-list">
                <ExerciseList
                  player={player}
                  playerId={playerId}
                  playerExercises={playerExercises}
                  exercisesThisWeek={ exercisesThisWeek}
                  today={ today }
                  todayTimestamp={ todayTimestamp }
                  currentUserId={ props.currentuserId }
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