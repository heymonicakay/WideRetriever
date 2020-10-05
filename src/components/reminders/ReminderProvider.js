import React, { useState, useEffect } from "react"
export const ReminderContext = React.createContext()

export const ReminderProvider = (props) => {
    const [reminders, setReminders] = useState([])
    const [searchTerms, setTerms] = useState("")
    const [playerReminders, setPlayerReminders] = useState([])

    const getReminders = () => {
        return fetch("http://localhost:8088/reminders")
            .then(res => res.json())
            .then(setReminders)
    }

    const getReminderByPlayerId = (playerId) => {
      return fetch(`http://localhost:8088/reminders?playerId=${playerId}`)
          .then(res => res.json())
          .then(setPlayerReminders)
  }

    const getReminderById = (id) => {
      return fetch(`http://localhost:8088/reminders/${id}`)
          .then(res => res.json())
  }

    const addReminder = reminder => {
        return fetch("http://localhost:8088/reminders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reminder)
        })
            .then(getReminders)
    }

    const editReminder = reminder => {
      return fetch(`http://localhost:8088/reminders/${reminder.id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(reminder)
      })
          .then(getReminders)
  }

  const patchReminder = reminder => {
    return fetch(`http://localhost:8088/reminders/${reminder.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reminder)
    }).then(getReminders);
  };

  const removeReminder = (reminderId) => {
    return fetch(`http://localhost:8088/reminders/${reminderId}`, {
        method: "DELETE"
    })
        .then(getReminders)
}


    return (
        <ReminderContext.Provider value={{
            reminders,
            addReminder,
            getReminders,
            getReminderById,
            searchTerms,
            setTerms,
            removeReminder,
            editReminder,
            getReminderByPlayerId,
            playerReminders,
            setPlayerReminders,
            patchReminder
        }}>
            {props.children}
        </ReminderContext.Provider>
    )
}