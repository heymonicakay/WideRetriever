import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { PlaytimeContext } from "./PlaytimeProvider"
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./PlaytimeForm.css"

export const PlaytimeForm = (props) => {
  //useRef
  const note = useRef()
  const tossBtn = useRef()
  const missCountText = useRef()
  const missBtn = useRef()
  const catchCountText = useRef()
  const catchBtn = useRef()

  //useContext
  const { addPlaytime, playtimes, getPlaytimes } = useContext(PlaytimeContext)
  const { getPlayerById } = useContext(PlayerContext)

  //useState
  const [playtime, setPlaytime] = useState({})
  const [player, setPlayer] = useState({})
  const [tossCount, setTossCount] = useState(0);
  const [catchCount, setCatchCount] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const [key, setKey] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isHidden, setIsHidden] = useState(false)
  const [isInProgress, setIsInProgress] = useState(true)
  const [cannotSubmit, setCannotSubmit] = useState(true)

  //useEffect
  useEffect(() => {
    getPlaytimes()
  }, [])
  useEffect(() => {
    const playerId = parseInt(props.match.params.playerId)
      getPlayerById(playerId)
        .then(setPlayer)
  }, [])

  //obj constructor
  const constructNewPlaytime = () => {

    {addPlaytime({
      playerId,
      catches: catchCount,
      misses: missCount,
      date: today,
      note: playtime.note,
      timestamp: todayTimestamp
    })
      .then(() => props.history.push(`/players/${playerId}`))}
  }

  //define vars
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')
  const playerId = parseInt(props.match.params.playerId)

  //event handlers
  const handleTossIncrement = () => {
    setTossCount(prevTossCount => prevTossCount + 1);
  };
  const handleCatchIncrement = () => {
    setCatchCount(prevCatchCount => prevCatchCount + 1);
  };
  const handleMissIncrement = () => {
    setMissCount(prevMissCount => prevMissCount + 1);
  };
  const handleReset = () => {
    setKey(prevKey => prevKey + 1)
  }
  const handleControlledInputChange = (e) => {
    const newPlaytime = Object.assign({}, playtime)
    newPlaytime[e.target.name] = e.target.value
    setPlaytime(newPlaytime)
  }
  const handleCannotSubmit = () => {
    if(tossCount == 5){
      setCannotSubmit(false)
    }
    else {
      setCannotSubmit(true)
    }
  }

  //renders the content inside of the circle timer
  const renderTime = ({ remainingTime }) => {
    if ( remainingTime === 10) {
      return <button type="button" className="behind btn btn--circle btn--green btn--toss" hidden={isHidden} ref={tossBtn} onClick={() => {
        handleTossIncrement()
        setIsPlaying(true)
        setIsDisabled(false)
        setIsHidden(true)}}>
          Toss
      </button>;
    }
    if (remainingTime === 0) {
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
            duration={10}
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
              handleCannotSubmit()
              handleReset()
              handleCatchIncrement()
              setIsDisabled(true)
              setIsHidden(false)}}>
                Catch
            </button>

            <h5 className="h5 count catch-count" name={catchCountText} ref={catchCountText} onChange={handleControlledInputChange}>
              {catchCount}
            </h5>
          </section>

          <section className="cont--miss">
            <button className="btn btn--circle btn--red btn--miss" disabled={isDisabled} ref={missBtn} onClick={() => {
              setIsPlaying(false)
              handleReset()
              handleCannotSubmit()
              handleMissIncrement()
              setIsDisabled(true)
              setIsHidden(false)}}>
                Miss
            </button>

            <h5 className="h5 count miss-count" name="missCountText" ref={missCountText} onChange={handleControlledInputChange}>
              {missCount}
            </h5>
          </section>
        </div>
        <div className="note-section">
          {cannotSubmit
            ? <textarea className="input input--note" disabled={cannotSubmit} name="note" ref={note} onChange={handleControlledInputChange} placeholder="Throw at least 5 tosses to log playtime...">
            </textarea>
            : <textarea className="input input--note" disabled={cannotSubmit} name="note" ref={note} onChange={handleControlledInputChange} placeholder="Add a note about today's playtime...">
            </textarea>
          }
          <button disabled={cannotSubmit} type="button" className="btn btn-submit submit submit-pt" onClick={e => {
          e.preventDefault()
          constructNewPlaytime()
          }}>
            Log Playtime
          </button>
        </div>
      </section>
    </div>
  );
}
