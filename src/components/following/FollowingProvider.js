import React, { useState, useEffect } from "react"

export const FollowingContext = React.createContext()

export const FollowingProvider = (props) => {
    const [currentUserFollowings, setCurrentUserFollowings] = useState([])
    const [followings, setFollowings] = useState([])
    const [fullFollowings, setFullFollowings]=useState([])
    const url = "http://localhost:8088/"
    const resource = "followings"

    const getFollowings = () => {
        return fetch(`${url}${resource}`)
            .then(res => res.json())
            .then(setFollowings)
    }

    const getUserFollowings = (currentUserId) => {
        return fetch(`${url}${resource}?userId=${currentUserId}`)
            .then(res => res.json())
            .then(setCurrentUserFollowings)
    }
    const getFullFollowings = () => {
        return fetch(`${url}${resource}?_expand=player`)
        .then(res => res.json())
        .then(setFullFollowings)
    }

    const addFollowing = followingObj => {
        return fetch(`${url}${resource}`, {
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
        return fetch(`${url}${resource}/${followingId}`, {
            method: "DELETE"
        })
            .then(getFullFollowings)
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
                getFullFollowings,
                fullFollowings
            }
        }>
            {props.children}
        </FollowingContext.Provider>
    )
}