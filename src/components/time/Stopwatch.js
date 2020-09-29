import React, { useState, useEffect } from "react";
import "./Stopwatch.css"

export const Stopwatch = (props) => {
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [areYouSure, setAreYouSure] = useState(false)
  const [breakTime, setBreakTime] = useState(false)

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);
        props.setIntSecond(secondCounter)
        props.setIntMinute(minuteCounter)
        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  const stopTimer = () => {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }

  const handleClick = () => {
    if(props.intMinute < 5) {
      setAreYouSure(true)
    }
    else{
      props.setStepOne(true)
      props.setStepTwo(true)
      props.setStepThree(false)
      props.setEndTime(props.currentTime)
      stopTimer()
    }
  }

  return (
    <div className="container">
      <div className="time">
        <div className="min-column">
          <span className="minute">{minute}</span>
          <span className="minute-text">minutes</span>
        </div>
        <span className="colon">:</span>
        <div className="sec-column">
        <span className="second">{second}</span>
        <span className="second-text">seconds</span>
        </div>
      </div>

      <div className="buttons">

          {isActive
            ?
            <>
            {areYouSure
              ?
              <>
                <p>
                  Woah! Are you sure you want to end this session so soon?
                </p>
                <button
                  onClick={() => {
                    setBreakTime(true)
                    setIsActive(!isActive)
                    setAreYouSure(false)}}
                  className="btn pause-ex">
                    Take A Break Instead
                </button>

                <button
                  onClick={() => setAreYouSure(false)}
                  className="btn pause-ex">
                    Oops! Nevermind!
                </button>

                <button
                  onClick={()=>{
                    props.setStepOne(true)
                    props.setStepTwo(true)
                    props.setStepThree(false)
                    props.setEndTime(props.currentTime)
                    stopTimer()
                  }}
                  className="btn end-ex">
                    Yes, I'm sure!
                </button>
              </>
              :
              <>
              <button
                  onClick={() => {
                    setBreakTime(true)
                    setIsActive(!isActive)}}
                  className="btn pause-ex">
                    Take A Break
              </button>

              <button
                onClick={()=>{handleClick()
                  }}
                className="btn end-ex">
                  End Exercise Session
              </button>
              </>
            }
            </>
            :
            <>
            <button
              onClick={() => {
                props.setStartTime(props.currentTime)
                setBreakTime(false)
                setAreYouSure(false)
                setIsActive(!isActive)}}
              className={`btn ${breakTime ? "resume-btn" : "start-btn"}`}>
                {breakTime ? "Keep It Goin'" : "Let's Go!"}
            </button>

            {breakTime
            ?
            <>
            {areYouSure
              ?
              <>
                <p>
                  Woah! Are you sure you want to end this session so soon?
                </p>
                <button
                  onClick={() => setAreYouSure(false)}
                  className="btn pause-ex">
                    Oops! Nevermind!
                </button>

                <button
                  onClick={()=>{
                    props.setStepOne(true)
                    props.setStepTwo(true)
                    props.setStepThree(false)
                    props.setEndTime(props.currentTime)
                    stopTimer()
                  }}
                  className="btn end-ex">
                    Yes, I'm sure!
                </button>
              </>
              :
              <>
              <button
                onClick={()=>{handleClick()
                  }}
                className="btn end-ex">
                  End Exercise Session
              </button>
              </>
            }
            </>
            :
            <>
            </>
            }
            </>
        }
      </div>
    </div>
  )
}