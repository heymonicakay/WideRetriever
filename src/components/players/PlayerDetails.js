//IMPORT
  import React, { useContext, useEffect, useState } from "react"
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
  import { WeeklyExerciseGoalTime } from "../exerciseGoals/WeeklyExerciseGoalTime"
  import { WeeklyPlaytimeGoalTime } from "../playtimeGoals/WeeklyPlaytimeGoalTime"
  import { DateContext} from "../time/DateProvider"
  import { PlayerActivityButtons } from "./PlayerActivityButtons"
  import { FollowButton } from "../following/FollowButton"

export const PlayerDetails = ( props ) => {
//CONTEXT
  const { getPlayerByPlayerId, player } = useContext(PlayerContext)
  const { playtimes, playerPlaytimes, getPlayerPlaytimes} = useContext(PlaytimeContext)
  const { trainings, playerTrainings, getPlayerTrainings } = useContext(TrainingContext)
  const { exercises, playerExercises, getPlayerExercises} = useContext(ExerciseContext)
  const { playtimeGoals, getPlaytimeGoals, getPlayerPlaytimeGoal, playerPlaytimeGoal } = useContext(PlaytimeGoalContext)
  const { trainingGoals, getTrainingGoals, getPlayerTrainingGoal, playerTrainingGoal } = useContext(TrainingGoalContext)
  const { exerciseGoals, getExerciseGoals, getPlayerExerciseGoal, playerExerciseGoal } = useContext(ExerciseGoalContext)
  const { date, getCurrentTimestamp,currentTimestamp, todayObj, thisMonthVar, thisWeekstart, filterByThisWeek, filteredByThisWeek, filterByToday, filteredByToday} = useContext(DateContext)
//STATE
  const [hidden, setHidden] = useState(true)
  const [exercisesToday, setExercisesToday] = useState([])
  const [exercisesThisWeek, setExercisesThisWeek] = useState([])
  const [playtimesToday, setPlaytimesToday] = useState([])
  const [playtimesThisWeek, setPlaytimesThisWeek] = useState([])
  const [trainingsToday, setTrainingsToday] = useState([])
  const [trainingsThisWeek, setTrainingsThisWeek] = useState([])
  const [catchesArray, setCatchesArray] = useState([])
  const [tossesArray, setTossesArray] = useState([])
  const [successRate, setSuccessRate] = useState(0)
  const [isOwner, setIsOwner] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [hideGames, setHideGames] = useState(true)
  const [hideExercise, setHideExercise] = useState(false)
  const [hideTraining, setHideTraining] = useState(true)

  const playerId = parseInt(props.match.params.playerId)

  //EFFECT
  useEffect(()=>{
    getPlaytimeGoals()
    getExerciseGoals()
    getTrainingGoals()
  }, [])
  useEffect(()=>{
    if(isOwner){
      setIsHidden(false)}
    else{
      setIsHidden(true)}
  }, [isOwner])

  useEffect(() => {
    const playerId = parseInt(props.match.params.playerId)
    getCurrentTimestamp()
    getPlayerByPlayerId(playerId)
    getPlayerPlaytimeGoal(playerId)
    getPlayerTrainingGoal(playerId)
    getPlayerExerciseGoal(playerId)
    getPlayerExercises(playerId)
    getPlayerPlaytimes(playerId)
    getPlayerTrainings(playerId)
  }, [playerId, playtimes, trainings, exercises, exerciseGoals, playtimeGoals, trainingGoals])

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
  }, [playerExercises])
  useEffect(() => {
    if(playerPlaytimes.length > 0){
      const catchesArray = playerPlaytimes.map(pp=> pp.catches) || []
      const tossesArray = playerPlaytimes.map(pp => pp.catches + pp.misses) || []
      const percentage = (findSum(catchesArray) / findSum(tossesArray)).toLocaleString("en", {style: "percent"}) || 0
      if(percentage === NaN){
        setSuccessRate(0)
      }
      else{
        setSuccessRate(percentage)
      }
      const todaysPlaytimes = playerPlaytimes.filter(pt => pt.date === todayObj) || []
      const thisWeeksPt = filterByThisWeek(playerPlaytimes)
        setPlaytimesToday(todaysPlaytimes)
        setPlaytimesThisWeek(thisWeeksPt)
        setCatchesArray(catchesArray)
        setTossesArray(tossesArray)
    }
  }, [])
//HANDLE
  const toggleHide = ()=>{
    if(hidden===true){
      setHidden(false)
    }
    else{
      setHidden(true)
    }
  }
  const findSum = (arr) => {
    let total = 0
    arr.forEach(k => {total += k})
  return total
  } /* ----> MATH */

  const showGames = () => {
      setHideGames(false)
      setHideExercise(true)
      setHideTraining(true)
  }
  const showExercise = () => {
    setHideGames(true)
    setHideExercise(false)
    setHideTraining(true)
}
const showTraining = () => {
  setHideGames(true)
  setHideExercise(true)
  setHideTraining(false)
}


  const playerValidation = () => {
      return (
        <>
        <div className="player-detail-container">
          <section className="pl-card pl-card-det-sec">
            <div className="pl-card-top">

              <div className="player-img-edit-follow-contain">
                <div className={`${isOwner ? "cont--img--detail" : "cont--img--detail-other"}`}>
                  {isOwner
                  ?<>
                  </>
                  :<>
                      <FollowButton
                        player={player}
                        playerId={playerId}
                        currentUserId={props.currentUserId}
                        {...props}/>
                  </>
                  }
                  <img className={`${isOwner ? "pl-card-img-detail": "pl-card-img-detail-other"}`} alt="" title={isOwner ? "Double click to edit player info." : "Image"} src={player.playerImg} onDoubleClick={isOwner ? () => {props.history.push(`/players/edit/${playerId}`)} : null}/>
                </div>
              </div>
                <p className={`header  ${isOwner ? "pl-card__header--name" : "pl-card__header--name-other"}`} onClick={toggleHide}>
                {player.name}
                </p>

              <section className="pl-card--details">
                <div className={`more-details ${isOwner ? "" :"more-details-other"}`} hidden={hidden}>
                  <div className="pl-card--breed">
                    {player.breed}
                  </div>
                  <div className="pl-card--age">
                    {player.age} years old
                  </div>
                </div>
              </section>
            </div>

              {isOwner
              ?<>
              <div className="add-activity-buttons">
                    <PlayerActivityButtons
                    player={player}
                    playerId={playerId}
                    {...props}/>
              </div>
              </>
              :<>
              <div className="spacer">
              </div>
              </>
              }
            </section>
          </div>
              {isOwner
              ?
              <div className="middle">
              <section className={`exercise-goal-section ${hideExercise ? "hidden" : "visible"}`}>
                <WeeklyExerciseGoalTime
                  findSum={findSum}
                  player={ player }
                  exercisesToday={ exercisesToday }
                  playerId={ playerId }
                  currentUserId={ props.currentuserId }
                  exercisesThisWeek={ exercisesThisWeek }
                  playerExerciseGoal={ playerExerciseGoal }
                  playerExercises={ playerExercises }
                  todayObj={ todayObj}
                  timestamp={ currentTimestamp }
                  {...props}/>
              </section>
              <section className={`playtime-goal-section ${hideGames ? "hidden" : "visible"}`}>
                <WeeklyPlaytimeGoalTime
                findSum={findSum}
                player={ player }
                playtimesToday={ playtimesToday }
                playerId={ playerId }
                currentUserId={ props.currentuserId }
                playtimesThisWeek={ playtimesThisWeek }
                playerPlaytimeGoal={ playerPlaytimeGoal }
                playerPlaytimes={ playerPlaytimes }
                todayObj={ todayObj}
                timestamp={ currentTimestamp }
                {...props}/>
                </section>
              </div>
              :<> </>
              }
            <div className={`${isOwner ? "button-bar" : "button-bar-other"}`}>
              <div className={`playtime-btn ${hideGames ? "" : "active"}`} onClick={()=>{showGames()}}>
                Games of Catch
              </div>
              <div className={`training-btn ${hideTraining ? "" : "active"}`} onClick={()=>{showTraining()}}>
                Training Sessions
              </div>
              <div className={`exercise-btn ${hideExercise ? "" : "active"}`} onClick={()=>{showExercise()}}>Exercise Sessions</div>
            </div>
            <div className="activity-section">

              <section className={`playtime ${hideGames ? "hidden" : "visible"} ${isOwner ? "" : "playtime-other"}`}>
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
                  isOwner={isOwner}
                {...props} />
              </section>

              <section className={`training ${hideTraining ? "hidden" : "visible"} ${isOwner ? "" : "training-other"}`}>
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

              <section className={`exercise ${hideExercise ? "hidden" : "visible"} ${isOwner ? "" : "exercise-other"}`}>
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
        </>
      )
    }
  //   else {
  //     return (
  //       <>
  //
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
  //
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