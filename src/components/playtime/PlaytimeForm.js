import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./PlaytimeForm.css"

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too late...</div>;
  }

  return (
    <div className="timer">
      <div className="value">{remainingTime}</div>
    </div>
  );
};

export const PlaytimeForm = (props) => {

  // identify miss count text and miss count button
  const missCountText = useRef()
  const missBtn = useRef()

  // identify catch count text and catch count button
  const catchCountText = useRef()
  const catchBtn = useRef()

  // get player info and set player state to the player obj matching the ID in url
  const { getPlayerById } = useContext(PlayerContext)
  const [player, setPlayer] = useState({})
  useEffect(() => {
    const playerId = parseInt(props.match.params.playerId)
      getPlayerById(playerId)
        .then(setPlayer)
  }, [])

  // increment the number of catches
  const [catchCount, setCatchCount] = useState(0);
  const handleCatchIncrement = () => {
    setCatchCount(prevCatchCount => prevCatchCount + 1);
  };

  // increment the number of misses
  const [missCount, setMissCount] = useState(0);

  const handleMissIncrement = () => {
    setMissCount(prevMissCount => prevMissCount + 1);
  };

  // reset the countdown
  const [key, setKey] = useState(0)
  const handleReset = () => {
    setKey(prevKey => prevKey + 1)
  }

  const [isPlaying, setIsPlaying] = useState(false)


  //if the misscounttext.current is greater than or equal to 5  then disable the 'miss button' and the 'count button

  return (
    <div className="cont--form-pt">
      <section className="form">
        <h1>
          {player.name}
        </h1>
        <div className="timer-wrapper">
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={10}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            onComplete={() => [false, 0]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>

        <div>

        <button onClick={() => {
          setIsPlaying(true)}}>
          Toss
        </button>
        <br />

        <button ref={catchBtn} onClick={() => {
          setIsPlaying(false)
          handleReset()
          handleCatchIncrement()}}>
          Catch
        </button>

        <h5 ref={catchCountText}>
          {catchCount}
        </h5>

        <button ref={missBtn} onClick={() => {
          setIsPlaying(false)
          handleReset()
          handleMissIncrement()}}>
          Miss
        </button>

        <h5 ref={missCountText}>
          {missCount}
        </h5>

        </div>
      </section>
    </div>
  );
}
