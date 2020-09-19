import React, { useContext } from "react"
import { PlaytimeContext } from "./PlaytimeProvider"
import "./Playtime.css"

export const Playtime = ( props ) => {
  const { removePlaytime } = useContext (PlaytimeContext)

  return(
  <section className="pt-card">
    <button className="btn btn--circle btn--red btn--del" onClick={() => {
      removePlaytime(props.playtime.id)
    }}>
      X
    </button>
    <div className="pt-card--details">
      <span className="pt-card--detail pt-card--date">
        {props.playtime.date}
      </span>
      <div className="pt-card--stats">
        <span className="pt-card--detail pt-card--catches">
          C: {props.playtime.catches}
        </span>
        <span className="pt-card--detail pt-card--misses">
          M: {props.playtime.misses}
        </span>
      </div>
    </div>
  </section>
  )
}