import React from "react"
import "./Playtime.css"

export const Playtime = ( {playtime} ) => (
  <section className="pt-card">
    <button className="btn btn--del">
      X
    </button>
    <div className="pt-card--details">
      <span className="pt-card--detail pt-card--date">
        {playtime.date}
      </span>
      <div className="pt-card--stats">
        <span className="pt-card--detail pt-card--catches">
          C: {playtime.catches}
        </span>
        <span className="pt-card--detail pt-card--misses">
          M: {playtime.misses}
        </span>
      </div>
    </div>
  </section>
)