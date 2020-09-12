import React, { useContext } from "react"
import { PlayerContext } from "./PlayerProvider"

export const PlayerSearch = () => {
    const { setTerms } = useContext(PlayerContext)

    return (
        <>
            <input type="text" className="input input__nav input__nav--search" placeholder="Search" onChange={(ce) => {
              setTerms(ce.target.value)
            }} />
        </>
    )
}