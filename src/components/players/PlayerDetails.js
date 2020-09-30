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
import { ExerciseGoal } from "../exerciseGoals/ExerciseGoal"
import { DateContext} from "../time/DateProvider"
import { PlayerGoalButtons } from "./PlayerGoalButtons"
import { PlayerActivityButtons } from "./PlayerActivityButtons"

export const PlayerDetails = ( props ) => {
  //useRef
  const unfollowDialog = useRef()

  //useContext
    const { currentUserFollowings, addFollowing, unfollow, getUserFollowings } = useContext(FollowingContext)
    const { getPlayerByPlayerId, player, getPlayers, players } = useContext(PlayerContext)
    const { playtimes, getPlaytimes, playerPlaytimes, getPlayerPlaytimes} = useContext(PlaytimeContext)
    const { trainings, getTrainings, playerTrainings, getPlayerTrainings } = useContext(TrainingContext)
    const { exercises, getExercises, playerExercises, getPlayerExercises} = useContext(ExerciseContext)
    const { getPlaytimeGoals, playtimeGoals, getPlayerPlaytimeGoal, playerPlaytimeGoal } = useContext(PlaytimeGoalContext)
    const { getTrainingGoals, trainingGoals, getPlayerTrainingGoal, playerTrainingGoal } = useContext(TrainingGoalContext)
    const { getExerciseGoals, exerciseGoals, getPlayerExerciseGoal, playerExerciseGoal } = useContext(ExerciseGoalContext)
    const { date, getCurrentTimestamp,currentTimestamp, todayObj, thisMonthVar, thisWeekstart, filterByThisWeek, filteredByThisWeek, filterByToday, filteredByToday} = useContext(DateContext)

  //useState
  //EXERCISE
    const [exercisesToday, setExercisesToday] = useState([])
    const [exercisesThisWeek, setExercisesThisWeek] = useState([])
  //PLAYTIMES
    const [playtimesToday, setPlaytimesToday] = useState([])
    const [playtimesThisWeek, setPlaytimesThisWeek] = useState([])
  //TRAININGS
    const [trainingsToday, setTrainingsToday] = useState([])
    const [trainingsThisWeek, setTrainingsThisWeek] = useState([])
    const [catchesArray, setCatchesArray] = useState([])
    const [tossesArray, setTossesArray] = useState([])
    const [successRate, setSuccessRate] = useState(0)

  //FOLLOWING
    const [iAmFollowing, setIAmFollowing] = useState(true)
    const [followConnectionTBD, setFollowConnectionTBD] = useState({})
    const [isOwner, setIsOwner] = useState(false)
    const [isHidden, setIsHidden] = useState(true)

    const playerId = parseInt(props.match.params.playerId)

  //useEffect
  useEffect(() => {
    getCurrentTimestamp()
    getPlayers()
    .then(getPlayerByPlayerId(playerId))
    getUserFollowings(props.currentUserId)
    getPlaytimeGoals()
    .then(getPlayerPlaytimeGoal(playerId))
    getTrainingGoals()
    .then(getPlayerTrainingGoal(playerId))
    getExerciseGoals()
    .then(getPlayerExerciseGoal(playerId))
    getExercises()
    .then(getPlayerExercises(playerId))
    getPlaytimes()
    .then(getPlayerPlaytimes(playerId))
    getTrainings()
    .then(getPlayerTrainings(playerId))
  }, [player])

  useEffect(()=>{
    if(player.userId === props.currentUserId){
      setIsOwner(true)}
    else{
      setIsOwner(false)}
  }, [player])

  useEffect(() => {
    const todaysTrainings = playerTrainings.filter(tr => tr.date === todayObj) || []
    const thisWeeksTr = filterByThisWeek(playerTrainings)
  setTrainingsToday(todaysTrainings)
  setTrainingsThisWeek(thisWeeksTr)
  }, [playerTrainings]) /* sets this WEEKS TRAININGS ARRAY for target player */

  useEffect(() => {
    const todaysExercises = playerExercises.filter(pe => pe.date === todayObj) || []
    const thisWeeksEx = filterByThisWeek(playerExercises)
  setExercisesToday(todaysExercises)
  setExercisesThisWeek(thisWeeksEx)
  }, [playerExercises]) /* sets this WEEKS EXERCISES ARRAY for target player */

  useEffect(()=>{
    if(isOwner){
      setIsHidden(false)
    }
    else{
      setIsHidden(true)
    }
  }, [isOwner])

  const findSum = (arr) => {
    let total = 0
      arr.forEach(k => {
        total += k
      })
    return total
  } /* ----> MATH */

  useEffect(() => {
    if(playerPlaytimes.length > 0){
      const catchesArray = playerPlaytimes.map(pp=> pp.catches) || []
      const tossesArray = playerPlaytimes.map(pp => pp.catches + pp.misses) || []
      const successRate = (findSum(catchesArray) / findSum(tossesArray)).toLocaleString("en", {style: "percent"}) || 0
      const todaysPlaytimes = playerPlaytimes.filter(pt => pt.date === todayObj) || []
      const thisWeeksPt = filterByThisWeek(playerPlaytimes)
        setPlaytimesToday(todaysPlaytimes)
        setPlaytimesThisWeek(thisWeeksPt)
        setCatchesArray(catchesArray)
        setTossesArray(tossesArray)
        setSuccessRate(successRate)
    }
  }, [playerPlaytimes]) /* sets this WEEKS PLAYTIMES ARRAY for target player */

  useEffect(()=>{
    const alreadyFollowing = currentUserFollowings.find(uf => uf.followedPlayerId === playerId)
    const followConnection = currentUserFollowings.find(uf => uf.followedPlayerId === playerId) || {}
  setIAmFollowing(alreadyFollowing)
  setFollowConnectionTBD(followConnection.id)
  }, [currentUserFollowings]) /* finds follow connection to be deleted */

  const createNewFollowConnection = () => {
    const newFollowConnection = {
        userId: props.currentUserId,
        followedPlayerId: playerId
    }
    addFollowing(newFollowConnection)
    .then(getUserFollowings(props.currentUserId))
  } /* CREATE new follow connection */
  const refreshPage = ()=>{
    window.location.reload();
  } /* force refresh */

  const playerValidation = () => {
      return (
        <>
        <div className="player-detail-container">
          <section className="pl-card pl-card-det-sec">
            <div className="pl-card-top">
              <div className="container">
                {isOwner
                ?<>
                  <PlayerActivityButtons
                  player={player}
                  playerId={playerId}
                  {...props}/>
                </>
                :<></>
                }
                <div className="cont--img cont--img--detail">
                  <img className="pl-card--img pl-card-img-detail" alt="" src={player.playerImg}/>
                </div>
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
              <section className="exercise-goal-section">
                <ExerciseGoal
                player={ player }
                exercisesToday={ exercisesToday }
                playerId={ playerId }
                currentUserId={ props.currentuserId }
                exercisesThisWeek={ exercisesThisWeek }
                playerExerciseGoal={ playerExerciseGoal }
                playerExercises={ playerExercises }
                todayObj={ todayObj}
                timeStamp={ currentTimestamp }
                {...props}/>
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
                {...props}
              />
              </section>
              <button className="btn" onClick={() => {
                props.history.push(`/players/edit/${playerId}`)
                  }}>
                Edit Player
              </button>
            </div>
            <div hidden={isHidden} className="button-group">
              <PlayerGoalButtons
                player={ player }
                currentUserId={ props.currentuserId }
                playerId={playerId}
                playerExerciseGoal={ playerExerciseGoal }
                playerPlaytimeGoal={ playerPlaytimeGoal }
                playerTrainingGoal={ playerTrainingGoal }
                {...props}
                />
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
              todayObj={ todayObj}
              currentTimestamp={ currentTimestamp }
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
              todayObj={ todayObj}
              currentTimestamp={ currentTimestamp }
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
              todayObj={ todayObj}
              isOwner={isOwner}
              currentTimestamp={ currentTimestamp }
              currentUserId={ props.currentuserId }
            { ...props}>
            </ExerciseList>
          </section>
        </div>
      </div>
    </>
  )
  }
  //   else {
  //     return (
  //       <>
  //         <dialog className="dialog dialog--unf-check" ref={unfollowDialog}>
  //           <div className="cont__dialog-msg--unf-check">
  //             Are you sure you want to unfollow {player.name}?
  //           </div>
  //           <div className="cont__dialog-btns--unf-check">
  //             <button className="btn btn-unfollow-sure"
  //               onClick={e => {
  //                   e.preventDefault()
  //                   unfollow(followConnectionTBD)
  //                   .then(getUserFollowings(props.currentUserId))
  //                   unfollowDialog.current.close()
  //               }}>
  //                 Yes, I'm sure.
  //             </button>
  //             <button className="btn btn-unf--nvm"
  //               onClick={e => unfollowDialog.current.close()}>
  //                 Actually, nevermind.
  //             </button>
  //           </div>
  //         </dialog>
  //         <div className="player-detail-section">
  //           <section className="pl-card pl-card-det-sec">
  //             <div className="pl-card-top">
  //               <div className="cont--img cont--img--detail">
  //                 <img className="pl-card--img pl-card-img-detail"
  //                   alt=""
  //                   src={player.playerImg}/>
  //               </div>
  //               <section className="pl-card--details">
  //                 <h1 className="h1 header pl-card__header--name-det-sec">
  //                   {player.name}
  //                 </h1>
  //                 <div className="pl-card--breed">
  //                   Breed: {player.breed}
  //                 </div>
  //                 <div className="pl-card--age">
  //                   Age: {player.age}
  //                 </div>
  //                 {iAmFollowing
  //                 ? <>
  //                   <button className="btn btn--unfollow"
  //                     onClick={() => {
  //                       unfollowDialog.current.showModal()
  //                     }}>
  //                       Unfollow {player.name}
  //                   </button>
  //                   </>
  //                 : <>
  //                   <button className="btn btn--follow"
  //                     onClick={(e) => {
  //                       e.preventDefault()
  //                       createNewFollowConnection()
  //                     }}>
  //                       Follow {player.name}
  //                   </button>
  //                   </>
  //                 }
  //               </section>
  //             </div>
  //           </section>
  //           <div className="activity-section">
  //             <section className="pl-pt-list">
  //               <PlaytimeList
  //                 player={player}
  //                 playerId={playerId}
  //                 playerPlaytimes={playerPlaytimes}
  //                 playtimesThisWeek={playtimesThisWeek}
  //                 todayObj={ todayObj}
  //                 currentTimestamp={ currentTimestamp }
  //                 currentUserId={ props.currentuserId }
  //               {...props} />
  //             </section>

  //             <section className="pl-tr-list">
  //               <TrainingList
  //                 player={player}
  //                 playerId={playerId}
  //                 playerTrainings={ playerTrainings }
  //                 trainingsThisWeek={ trainingsThisWeek }
  //                 todayObj={ todayObj}
  //                 currentTimestamp={ currentTimestamp }
  //                 currentUserId={ props.currentuserId }
  //               {...props} />
  //             </section>

  //             <section className="pl-ex-list">
  //               <ExerciseList
  //                 player={player}
  //                 playerId={playerId}
  //                 playerExercises={playerExercises}
  //                 exercisesThisWeek={ exercisesThisWeek}
  //                 todayObj={ todayObj }
  //                 currentTimestamp={ currentTimestamp }
  //                 currentUserId={ props.currentuserId }
  //               { ...props} />
  //             </section>
  //           </div>
  //         </div>
  //       </>
  //     )
  //   }
  // }
  return (
    <>
    {playerValidation()}
    </>
  )

}