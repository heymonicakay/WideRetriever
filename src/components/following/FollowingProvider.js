import React, { useState, useEffect } from "react"

export const FollowingContext = React.createContext()

export const FollowingProvider = (props) => {

    const [followings, setFollowings] = useState([])

    const getFollowings = () => {
        return fetch("http://localhost:8088/followings")
            .then(res => res.json())
            .then(setFollowings)
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

    useEffect(() => {
        getFollowings()
    }, [])

    return (
        <FollowingContext.Provider value={
            {
                followings,
                setFollowings,
                getFollowings,
                addFollowing,
                unfollow
            }
        }>
            {props.children}
        </FollowingContext.Provider>
    )
}