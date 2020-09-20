import React, { useContext } from "react"
import { PlayerContext } from "./PlayerProvider"
import "../Search.css"

export const PlayerSearch = (props) => {

    const { setTerms } = useContext(PlayerContext)

    return (
        <>
              <img className="input__nav--search-img" src="https://res.cloudinary.com/heymonicakay/image/upload/v1600576161/wideRetriever/search_ccx8jf.png"
              />
              <input type="text" className="input input__nav input__nav--search" defaultValue="" onChange={(e) => {
                setTerms(e.target.value)
              }} />
        </>
    )
}

