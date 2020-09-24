import React from "react"
import "../players/Player.css"

export const TodaysProgress = ( props ) => {

    return (
      <>
    <section className="daily-summary">
      <div>
      Here's a summary of today's activities:
      </div>
      {props.playtimesToday.length} playtimes. <br />
      {props.exercisesToday.length} training sessions. <br />
      {props.exercisesToday.length} exercise sessions. <br />
    </section>
    </>
    )
  }


