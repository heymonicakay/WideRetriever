import { TrainingGoalContext } from "../trainingGoals/TrainingGoalProvider"
  import "./Training.css"

  //refs
  const goalSet = useRef(null)

  const { getTrainingGoals, getPlayerTrainingGoals, editTrainingGoal,  trainingGoals } = useContext(TrainingGoalContext)

  const thisWeek = props.trainingsThisWeek.length

  const handleControlledInputChange = (e) => {
    const newPlayerTrainingGoal = Object.assign({}, playerTrainingGoal)
    newPlayerTrainingGoal[e.target.name] = e.target.value
    setPlayerTrainingGoal(newPlayerTrainingGoal)
  }

  const constructNewTrainingGoal = () => {
    //define player ID

    {editTrainingGoal({
      id: props.playerTrainingGoal.id,
      playerId: playerId,
      goalSet: playerTrainingGoal.goalSet,
      timestamp:Date.now(),
      date: props.todayObj,
    })
    .then(() => props.history.push(`/players/${playerId}`))}
  }

  {editMode
    ? <>
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
        constructNewTrainingGoal()
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
      {playerTrainingGoal.goalSet}
      </div>
    </>
  }