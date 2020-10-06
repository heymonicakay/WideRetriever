import React, { useState, useEffect } from "react";
import "./Stopwatch.css"

export const TrainingStopwatch = (props) => {
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
            ? <>
              {areYouSure
                ? <div className="are-you-sure">
                    <div className="are-you-sure-msg">
                      <div className="woah">
                        Woah!
                      </div>
                      <div className="sure">
                        Are you sure you want to end this training session?
                      </div>
                    </div>
                    <button onClick={() => setAreYouSure(false)}
                      className="btn btn-oops pause-ex">
                        Oops! Nevermind!
                    </button>
                    <button onClick={()=>{
                      props.setStepOne(true)
                      props.setStepTwo(true)
                      props.setStepThree(false)
                      props.setEndTime(props.currentTime)
                      stopTimer()
                      }}
                      className="btn end-ex">
                        Yes, I'm sure!
                    </button>
                  </div>
                : <>
                  <div onClick={() => {
                      setBreakTime(true)
                      setIsActive(!isActive)}}
                      className="break-btn">
                        <img src="https://res.cloudinary.com/heymonicakay/image/upload/v1601928981/wideRetriever/FCDD1687-36D9-4E07-8DA6-E57A24C01284_r7yemf.png" alt="" className="break-btn-img" title="Click to pause the timer."/>
                  </div>
                  <button onClick={handleClick}
                    className="btn end-ex">
                      End Training Session
                  </button>
                </>
              }
            </>
            :
            <>
            <div onClick={() => {
                props.setStartTime(props.currentTime)
                setBreakTime(false)
                setAreYouSure(false)
                setIsActive(!isActive)}}
                className="start-btn">
                  <img src="https://res.cloudinary.com/heymonicakay/image/upload/v1601416449/wideRetriever/60E0728A-353C-429A-BC91-F82F71CD5299_j11qcy.png" alt="" className="start-btn-img" title={`${breakTime ? "Click to resume\.\.\." : "Click to start!"}`}/>
            </div>
            {breakTime
              ? <>
                {areYouSure
                  ? <>
                    <div className="are-you-sure">
                      <div className="are-you-sure-msg">
                        <div className="woah">
                          Woah!
                        </div>
                        <div className="sure">
                          Are you sure you want to end your training session so soon?
                        </div>
                      </div>
                      <button
                        onClick={() => setAreYouSure(false)}
                        className="btn btn-oops pause-ex">
                          Oops! Nevermind!
                      </button>
                      <button onClick={()=>{
                          props.setStepOne(true)
                          props.setStepTwo(true)
                          props.setStepThree(false)
                          props.setEndTime(props.currentTime)
                          stopTimer()
                          }}
                          className="btn end-ex">
                            Yes, I'm sure!
                      </button>
                    </div>
                  </>
                  :
                  <>
                    <button onClick={handleClick}
                      className="btn end-ex">
                        End Training Session
                    </button>
                  </>
                }
              </>
              :
              <></>
            }
          </>
          }
        </div>
      </div>
    )
}