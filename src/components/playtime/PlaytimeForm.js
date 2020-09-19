import React, { useContext, useState, useEffect, useRef } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { PlaytimeContext } from "./PlaytimeProvider"
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./PlaytimeForm.css"

export const PlaytimeForm = (props) => {
  // expose playtime provider components to this function
  const { addPlaytime, playtimes, getPlaytimes } = useContext(PlaytimeContext)

  const [playtime, setPlaytime] = useState({})

  const handleControlledInputChange = (e) => {
    const newPlaytime = Object.assign({}, playtime)

    newPlaytime[e.target.name] = e.target.value

    setPlaytime(newPlaytime)
  }

  useEffect(() => {
    getPlaytimes()
  }, [])

  const constructNewPlaytime = () => {

    const playerId = parseInt(props.match.params.playerId)

    {addPlaytime({
      playerId,
      catches: catchCount,
      misses: missCount,
      date: today,
      note: playtime.note,
    })
      .then(() => props.history.push(`/players/${playerId}`))}
  }

  // translate alien timstamp into human date
  const todayTimestamp = Date.now()
  const today = new Date(todayTimestamp).toLocaleDateString('en-US')

  //identify the note section
  const note = useRef()

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

  //controls state of game in progress (when true, notes and submit disabled. When false notes and submit enabled)
  const [isInProgress, setIsInProgress] = useState(true)

  //renders the content inside of the circle timer
  const renderTime = ({ remainingTime }) => {
    if ( remainingTime == 11) {
      return <button type="button" className="behind btn btn--circle btn--green btn--toss" hidden={isHidden} ref={tossBtn} onClick={() => {
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

  const [cannotSubmit, setCannotSubmit] = useState(true)

  const handleCannotSubmit = () => {
    if(tossCount == 5){
      setCannotSubmit(false)
    }
    else {
      setCannotSubmit(true)
    }
  }

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
