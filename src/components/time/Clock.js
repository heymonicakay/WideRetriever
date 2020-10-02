import React, { useState, useEffect } from 'react';

export const Clock = (props) => {
  const [date, setDate] = useState(new Date());
 useEffect(() => {
  var timerID = setInterval( () => tick(), 1000 );
  return function cleanup() {
      clearInterval(timerID);
    };
 });
  const tick = () => {
    setDate(new Date());
  }

  return (
      <div>
          {date.toLocaleTimeString()}.
      </div>
    );
}