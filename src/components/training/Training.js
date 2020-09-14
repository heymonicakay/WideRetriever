import React from "react"
import "./Training.css"

export const Training = ( {training} ) => (
  <section className="tr-card">
    <button className="btn btn--del">
      X
    </button>
    <div className="tr-card--details">
      <span className="tr-card--detail tr-card--date">
        {training.date}
      </span>
      <div className="tr-card--stats">
        <span className="tr-card--detail tr-card--catches">
          {training.duration}
        </span>
      </div>
    </div>
  </section>
)