import React, { useRef, useContext, useEffect, useState } from "react"
import { FollowingContext } from "../following/FollowingProvider"
import { PlayerContext } from "./PlayerProvider"
import "./Player.css"
import { PlaytimeList } from "../playtime/PlaytimeList"
import { TrainingList } from "../training/TrainingList"
import { ExerciseList } from "../exercise/ExerciseList"

export const PlayerDetails = ( props ) => {
  const delDialog = useRef()
  const unfollowDialog = useRef()

  const { followings, addFollowing, unfollow, getFollowings } = useContext(FollowingContext)
  useEffect(()=> {
    getFollowings()
  }, [])

  const { removePlayer, getPlayerById } = useContext(PlayerContext)
  useEffect(() => {
    const playerId = parseInt(props.match.params.playerId)
      getPlayerById(playerId)
        .then(setPlayer)
  }, [])

  const activeUser = parseInt(sessionStorage.getItem("wr__user"))
  useEffect(() => {
    alreadyFollowing()
  }, [followings])

  const [player, setPlayer] = useState({})
  const [iAmFollowing, setIAmFollowing] = useState(false)

/********************************** CREATE new follow */
  const createNewFollowConnection = () => {
    const newFollowConnection = {
        userId: activeUser,
        followedPlayerId: player.id
    }
    addFollowing(newFollowConnection)
    .then(getFollowings)
  }
/*************************************************** FORCE RELOAD FUNC */
  const refreshPage = ()=>{
    window.location.reload();
  }

/********************************** VERIFY - is active user following a given player? Sets  STATE of iAmFollowing var equal to val of returned boolean */
  const alreadyFollowing = () => {
    if (followings.find(f => f.followedPlayerId === player.id && f.userId === activeUser)) {
      setIAmFollowing(true)
    }
    else {
      setIAmFollowing(false)
    }
  }
 /************************************* FINDS followingObj that exists between active user and targeted player. Obj stored in followConnection var - Obj required for DELETE */
  const findFollowConnection = () => {
    const followConnectionId = followings.find(f => f.followedPlayerId === player.id && f.userId === activeUser).id

    console.log(followConnectionId,"followConnection")

    unfollow(followConnectionId).then(getFollowings)
  }

  const playerValidation = () => {
    // if the player belongs to the active user, afford EDIT and DELETE
    if(activeUser === player.userId) {
      return (
        <>
  <>{/************************************************* DIALOG - DELETE PLAYER DOUBLE CHECK*/}</>
        <dialog className="dialog dialog--del-check" ref={delDialog}>
            <div className="cont__dialog-msg--del-check">
              Woof! Are you sure you want to remove {player.name} from the roster?
            </div>

            <div className="cont__dialog-btns--del-check">
              <button className="btn btn-del--sure" onClick={() => removePlayer(player.id).then(() => props.history.push("/players"))}>
                  Yes, I'm sure.
              </button>
              <button className="btn btn-del--nvm" onClick={e => delDialog.current.close()}>
                  Actually, nevermind.
              </button>
            </div>
          </dialog>
  <>{/*********************************************** PLAYER DETAILS - PLAYER OWNED BY USER*/ }</>

          <section className="pl-card">
            <h1 className="h1 header pl-card__header--name">
              {player.name}
            </h1>
            <section className="pl-card--details">
              <div className="cont--img">
                <img className="pl-card--img" alt="" src={player.playerImg}/>
              </div>
              <div className="pl-card--breed">
                Breed: {player.breed}
              </div>
              <div className="pl-card--age">
                Age: {player.age}
              </div>
              <div className="pl-card--number">
                Number: {player.number}
              </div>
            </section>
            <button className="btn" onClick={() => {
              props.history.push(`/players/edit/${player.id}`)
                }}>
              Edit Player
            </button>
            <button className="btn btn--red" onClick={() => {
              delDialog.current.showModal()
            }}>
              Remove From Roster
            </button>
          </section>
  <>{/********************************************************* ADD'L PLAYER DETAILS*/}</>

            <section className="pl-pt-list">
              <PlaytimeList {...props} />
            </section>

            <section className="pl-tr-list">
              <TrainingList {...props} />
            </section>

            <section className="pl-ex-list">
              <ExerciseList { ...props} />
            </section>
          </>
      )
    }
    else {
      //if player does NOT belong to the user, afford FOLLOW && UNFOLLOW
      return (
        <>
  <>{/******************************************** DIALOG - UNFOLLOW DOUBLE CHECK*/ }</>
          <dialog className="dialog dialog--unf-check" ref={unfollowDialog}>
            <div className="cont__dialog-msg--unf-check">
              Are you sure you want to unfollow {player.name}?
            </div>
            <div className="cont__dialog-btns--unf-check">
              <button className="btn btn-unfollow-sure"
                onClick={e => {
                    e.preventDefault()
                    findFollowConnection()
                    unfollowDialog.current.close()
                }}>
                        Yes, I'm sure.
              </button>
              <button className="btn btn-unf--nvm" onClick={e => unfollowDialog.current.close()}>
                  Actually, nevermind.
              </button>
            </div>
          </dialog>
  <>{/*********************************** PLAYER DETAILS - PLAYER NOT OWNED BY USER*/}</>
          <section className="pl-card">
            <h1 className="h1 header pl-card__header--name">
              {player.name}
            </h1>
            <section className="pl-card--details">
              <div className="cont--img">
                <img className="pl-card--img" alt="" src={player.playerImg}/>
              </div>
              <div className="pl-card--breed">
                Breed: {player.breed}
              </div>
              <div className="pl-card--age">
                Age: {player.age}
              </div>
              <div className="pl-card--number">
                Number: {player.number}
              </div>
  <>{/***************************************** ALREADY FOLLOWING TERNARY STATEMENT*/}</>
              {iAmFollowing
                ?
                  <>
                    <button className="btn btn--unfollow" onClick={() => {
                      unfollowDialog.current.showModal()
                    }}>
                      Unfollow {player.name}
                    </button>
                  </>
                :
                  <>
                    <button className="btn btn--follow" onClick={(e) => {
                        e.preventDefault()
                        createNewFollowConnection()
                    }}>
                      Follow {player.name}
                    </button>
                  </>
              }
            </section>
          </section>
<>{/***************************************************** ADD'L PLAYER DETAILS*/}</>
          <section className="pl-pt-list">
            <PlaytimeList {...props} />
          </section>

          <section className="pl-tr-list">
            <TrainingList {...props} />
          </section>

          <section className="pl-ex-list">
            <ExerciseList { ...props} />
          </section>
        </>
      )
    }
  }
  return (
    <>
    {playerValidation()}
    </>
  )
}