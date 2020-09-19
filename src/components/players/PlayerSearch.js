import React, { useContext, useState } from "react"
import { PlayerContext } from "./PlayerProvider"
import "../Search.css"

export const PlayerSearch = (props) => {
    const { setTerms } = useContext(PlayerContext)

    return (
        <>
            <input type="text" className="input input__nav input__nav--search" defaultValue="" placeholder="Search" onChange={(e) => {
              setTerms(e.target.value)
            }} />
        </>
    )
}

