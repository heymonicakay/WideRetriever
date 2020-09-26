import React, { useState, useEffect } from "react"

export const FollowingContext = React.createContext()

export const FollowingProvider = (props) => {
    const [currentUserFollowings, setCurrentUserFollowings] = useState([])

    const [followings, setFollowings] = useState([])

    const getFollowings = () => {
        return fetch("http://localhost:8088/followings")
            .then(res => res.json())
            .then(setFollowings)
    }

    const getUserFollowings = (currentUserId) => {
      return fetch(`http://localhost:8088/followings?userId=${currentUserId}`)
          .then(res => res.json())
          .then(setCurrentUserFollowings)
  }

  const getStackedFollowings = (currentUserId) => {
    return fetch(`http://localhost:8088/followings?userId=${currentUserId}`)
        .then(res => res.json())
        .then(setCurrentUserFollowings)
}

    const addFollowing = followingObj => {
        return fetch("http://localhost:8088/followings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(followingObj)
        })
            .then(res => res.json())
            .then((res) => {
                const createdFollowing = res
                getFollowings()
                return createdFollowing
            })
    }

    const unfollow = followingId => {
        return fetch(`http://localhost:8088/followings/${followingId}`, {
            method: "DELETE"
        })
            .then(getFollowings)
    }

    return (
        <FollowingContext.Provider value={
            {
                followings,
                setFollowings,
                getFollowings,
                addFollowing,
                unfollow,
                getUserFollowings,
                currentUserFollowings,
                setCurrentUserFollowings,
            }
        }>
            {props.children}
        </FollowingContext.Provider>
    )
}