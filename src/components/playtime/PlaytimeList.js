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
  const [emptyMsg, setEmptyMsg] = useState(false)
//EFFECT
  useEffect(()=>{
    if(props.playerPlaytimes === []){
      setEmptyMsg(true)}
    else {
      setEmptyMsg(false)}
  }, [props.playerPlaytimes])
//HANDLE
  const toggleEditMode = () => {
    if (editMode === true) {
      setEditMode(false)}
    else {
      setEditMode(true)}}
//RETURN
  return (
      <>
      {emptyMsg
        ?<>
          <div className="cont__list cont__list--pl">
            <h2 className="list__header list__header--pl">
              Playtime
            </h2>
            <NoPlaytimes
            player={props.player}
            {...props}/>
          </div>
        </>
        :<>
          <div className="cont__list cont__list--pl">
            <h2 className="list__header list__header--pl">
              Playtime
            </h2>
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
              })
              }
            </article>
          </div>
        </>
      }
    </>
  )
  }
