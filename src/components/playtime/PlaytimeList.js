//IMPORT
  import React, { useState, useContext, useEffect} from "react"
  import { PlaytimeContext } from "./PlaytimeProvider"
  import { Playtime } from "./Playtime"
  import { NoPlaytimes } from "./NoPlaytimes"
  import "./Playtime.css"

export const PlaytimeList = (props) => {
//CONTEXT
  const {removePlaytime} = useContext(PlaytimeContext)
//STATE
  const [editMode, setEditMode] = useState(false)
//HANDLE
  const toggleEditMode = () => setEditMode(!editMode)
//RETURN
    return ( <>
        {props.playerPlaytimes.length > 0
        ? <div className="cont__list cont__list--pl">
            <article className="list list--pt">
                {props.playerPlaytimes.map(pt => {
                    return <Playtime {...props}
                    key={pt.id}
                    playtime={pt}
                    removePlaytime={removePlaytime}
                    userId={props.currentUserId}
                    playerId={props.playerId}
                    player={props.player}
                    toggleEditMode={toggleEditMode}
                    isOwner={props.isOwner}
                    />
                }).reverse()}
            </article>
        </div>
        : <div className="cont__list cont__list--pl">
            <NoPlaytimes
            player={props.player}
            {...props}/>
        </div>
        }
    </>)
}
