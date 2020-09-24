import React, { useState } from "react"
export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const currentUserId = sessionStorage.getItem("wr__user")


    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    const getCurrentUser = (id) => {
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
            users,
            addUser,
            getUsers,
            currentUser,
            setCurrentUser,
            getCurrentUser,
            currentUserId
        }}>
            {props.children}
        </UserContext.Provider>
    )
}