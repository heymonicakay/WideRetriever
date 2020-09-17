import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./PlaytimeForm.css"

export const PlaytimeForm = (props) => {

  //identify the toss count button
  const tossBtn = useRef()

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

  // increment the number of tosses
  const [tossCount, setTossCount] = useState(0);
  const handleTossIncrement = () => {
    setTossCount(prevTossCount => prevTossCount + 1);
  };

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

  // controls state of timer
  const [isPlaying, setIsPlaying] = useState(false)

  // controls state of catch and miss buttons
  const [isDisabled, setIsDisabled] = useState(true)

  // controls state of toss button
  const [isHidden, setIsHidden] = useState(false)

  //renders the content inside of the circle timer
  const renderTime = ({ remainingTime }) => {
    if ( remainingTime == 11) {
      return <button className="behind btn btn--circle btn--green btn--toss" hidden={isHidden} ref={tossBtn} onClick={() => {
        handleTossIncrement()
        setIsPlaying(true)
        setIsDisabled(false)
        setIsHidden(true)}}>
          Toss
      </button>;
    }
    if (remainingTime == 0) {
      setIsPlaying(false)
      handleReset()
      setIsHidden(false)
    }
    else {
      setIsHidden(true)
      return (
        <div className="timer">
          <div className="seconds">
            {remainingTime}
          </div>
        </div>
      );
    }


  };

  return (
    <div className="cont--form-pt">
      <section className="form">
        <h1 className="h1 header__form header__form--pt">
          {player.name}
        </h1>
        <div className="timer-wrapper">
          <CountdownCircleTimer
            className="circle-timer"
            key={key}
            isPlaying={isPlaying}
            duration={11}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            onComplete={() => [false, 0]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>

        <div className="cont--catch-miss">
          <section className="cont--catch">
            <button className="btn btn--circle btn--green btn--catch" disabled={isDisabled} ref={catchBtn} onClick={() => {
              setIsPlaying(false)
              handleReset()
              handleCatchIncrement()
              setIsDisabled(true)
              setIsHidden(false)}}>
                Catch
            </button>

            <h5 className="h5 count catch-count"ref={catchCountText}>
              {catchCount}
            </h5>
          </section>

          <section className="cont--miss">
            <button className="btn btn--circle btn--red btn--miss" disabled={isDisabled} ref={missBtn} onClick={() => {
              setIsPlaying(false)
              handleReset()
              handleMissIncrement()
              setIsDisabled(true)
              setIsHidden(false)}}>
                Miss
            </button>

            <h5 className="h5 count miss-count" ref={missCountText}>
              {missCount}
            </h5>
          </section>
        </div>
      </section>
    </div>
  );
}
