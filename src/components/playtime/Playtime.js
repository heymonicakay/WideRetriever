import React, { useContext, useState } from "react"
import { PlaytimeContext } from "./PlaytimeProvider"
import "./Playtime.css"

export const Playtime = ( props ) => {
  const { removePlaytime } = useContext(PlaytimeContext)
  const [hideDetails, setHideDetails] = useState(true)
  const [canEdit, setCanEdit ] = useState(false)
  const tosses = props.playtime.catches + props.playtime.misses
  const average = props.playtime.catches / tosses
  const percent = average.toLocaleString('en', {style: 'percent'})

  const toggleHide = () => {
    if(hideDetails === true) {
      setHideDetails(false)
    }
    else{
      setHideDetails(true)
    }
  }

  return(
  <section className="pt-card">
    <div className="pt-card--details">
      <div className="pt-card--detail pt-card--date">
        <div className="date">
          {props.playtime.date}
        </div>
        <div className="percent">
          {percent}
        </div>
        <div className="arrow" onClick={toggleHide}>
          <img className="down-arrow down-arrow-img" src={hideDetails ? "https://res.cloudinary.com/heymonicakay/image/upload/a_90/v1601408603/wideRetriever/FB962FED-6991-4FCE-8D65-1A3A33211BA9_rnqjrl.png" : "https://res.cloudinary.com/heymonicakay/image/upload/a_270/v1601408603/wideRetriever/FB962FED-6991-4FCE-8D65-1A3A33211BA9_rnqjrl.png" } alt=""/>
        </div>
      </div>

      <div className={`pt-card--stats ${hideDetails ? "hide" : "show"}`}>
        <div className="pt-card--detail pt-card--catches">
          Catches: {props.playtime.catches}
        </div>
        <div className="pt-card--detail pt-card--misses">
          Misses: {props.playtime.misses}
        </div>
        <div className="pt-card-note">
          {props.playtime.note}
        </div>
        {props.isOwner
        ?<>
        <div className={`delete-button ${hideDetails ? "hide" : "show"}`} onClick={() => {
            removePlaytime(props.playtime.id)
            }}>
        </div>
        </>
        :<>
        </>
        }
      </div>

    </div>
  </section>
  )
}