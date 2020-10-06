import React, { useState, useEffect } from 'react';
import "../users/Dashboard.css"

export const Clock = (props) => {
  const [date, setDate] = useState(new Date());
 useEffect(() => {
  var timerID = setInterval( () => tick(), 1000 );
  return function cleanup() {
      clearInterval(timerID);
    };
 });
 useEffect(()=>{
  const hour = date.toLocaleString('en-US', {hour12: false, hour: "2-digit"})
  if(hour < 12){
    props.setMorning(true)
    props.setAfternoon(false)
    props.setEvening(false)
  }
  else if(hour >= 12 && hour < 17 ) {
    props.setMorning(false)
    props.setAfternoon(true)
    props.setEvening(false)
  }
  else if(hour >= 17){
    props.setMorning(false)
    props.setAfternoon(false)
    props.setEvening(true)
  }
 }, [date])

  const tick = () => {
    setDate(new Date());
  }

  return (
    <>
        <div className="time-dash">
          {date.toLocaleTimeString('en-US', {timeStyle: "short"})}
        </div>


      </>
    );
}