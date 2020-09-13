import React, { useContext } from "react"
import { PlayerContext } from "./PlayerProvider"
import "../Search.css"

export const PlayerSearch = () => {
    const { setTerms } = useContext(PlayerContext)

    return (
        <>
            <input type="text" className="input input__nav input__nav--search" placeholder="Search" onChange={(e) => {
              setTerms(e.target.value)
            }} />
        </>
    )
}