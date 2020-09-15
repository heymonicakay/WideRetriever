import React, { useState } from "react"
export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    const getCurrentUser = () => {
      const currentUserId = localStorage.getItem("wr_user")
      const id = parseInt(currentUserId)
      return fetch(`http://localhost:8088/users/${id}`)
      .then(res => res.json())
      .then(setCurrentUser)
  }

    const addUser = user => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    }

    return (
        <UserContext.Provider value={{
            users, addUser, getUsers, getCurrentUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}