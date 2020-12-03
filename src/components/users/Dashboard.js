import React, { useState, useContext, useEffect } from "react"
import { PlayerContext } from "../players/PlayerProvider"
import { PlayerList } from "../players/PlayerList"
import { Clock } from "../time/Clock"
import "../players/Player.css"
import { UserContext } from "../users/UserProvider"
import { ReminderForm } from "../reminders/ReminderForm"
import { ReminderList } from "../reminders/ReminderList"
import "./Dashboard.css"

export const UserDash = (props) => {

  const { userPlayers, getUserPlayers  } = useContext(PlayerContext)
  const { getCurrentUser, currentUser  } = useContext(UserContext)

  const [morning, setMorning] = useState(false)
  const [afternoon, setAfternoon] = useState(false)
  const [evening, setEvening] = useState(false)

  useEffect(() => {
      getCurrentUser(props.currentUserId)
      getUserPlayers(props.currentUserId)
  }, [])

  return (
      <>
        <div className="user-dash-top">
          <div className="welcome-msg">
            <p className="welcome-msg hello">
            {morning ? `good morning, ${currentUser.username}.` :<></>}
            {afternoon ? `good afternoon, ${currentUser.username}.` :<></>}
            {evening ? `good evening, ${currentUser.username}.` :<></>}
            </p>
          </div>
            <Clock
                morning={morning}
                setMorning={setMorning}
                afternoon={afternoon}
                setAfternoon={setAfternoon}
                evening={evening}
                setEvening={setEvening}
            {...props}/>
          <div className="player-list-dash">
            <PlayerList
              {...props}
              currentUser={currentUser}
              userPlayers={userPlayers}
              />
          </div>
          <p className="welcome-msg summary">
            Here's a summary of your upcoming tasks.
          </p>
          <div className="reminder-list-cont">
          <ReminderForm
            currentUserId={props.currentUserId}
            {...props}/>
            <ReminderList
            currentUserId={props.currentUserId}
            {...props} />
          </div>
        </div>


      </>
)
}