import React from "react"
import "../players/Player.css"

export const WeeksProgress = ( props ) => {

    return (
      <>
    <section className="weekly-summary">
      <div>
      Here's a summary of this weeks's activities:
      </div>
      {props.playtimesThisWeek.length} playtimes. <br />
      {props.exercisesThisWeek.length} training sessions. <br />
      {props.exercisesThisWeek.length} exercise sessions. <br />
    </section>
    </>
    )
  }


