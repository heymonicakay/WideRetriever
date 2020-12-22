import React, { useState, useContext, useEffect } from "react"
import { PlayerSearch } from "../players/PlayerSearch"
import { UserContext } from "../users/UserProvider"
import { AccountDropdown } from "./AccountDropdown"
import Default from "../icons/icon_paw_fill.png"
import "./Nav.css"

export const Nav = (props) => {
    const [showAccountDropdown, setShowAccountDropdown] = useState(false)
    const [letter, setLetter] = useState("")
    const [image, setImage] = useState(Default)

    const { getCurrentUser, currentUser } = useContext(UserContext)

    useEffect(()=>{
        getCurrentUser(props.currentUserId)
    }, [])

    useEffect(()=>{
        const username = currentUser.username || {}
        if(username){
            const deconUsername = {...username}
            const letter = deconUsername[0]
            setLetter(letter)
        }
    }, [currentUser])

    useEffect(()=>{
        if(letter){
            const image = `/icons/letters/icon_${letter}.png`
            setImage(image)
        }
    }, [letter])

    const toggleAccount = () => {
        setShowAccountDropdown(!showAccountDropdown)
    }

    return (
        <>
        <div className="nav">
            <div className="cont--search">
                <PlayerSearch {...props}/>
            </div>
            <div className="nav-group--account">
                <div className={`cont--account ${showAccountDropdown ? "cont--account--open" : "cont--account--collapsed" }`}>
                    <AccountDropdown
                    showAccountDropdown={showAccountDropdown}
                    toggleAccount={toggleAccount}
                    {...props} />
                </div>
            </div>
            <div className="home-icon" onClick={toggleAccount}>
                <img className="home-icon-url" src={image} alt="" />
            </div>
        </div>
        </>
    )
}