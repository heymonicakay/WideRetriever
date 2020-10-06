import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { PlayerSearch } from "../players/PlayerSearch"
import { UserContext } from "../users/UserProvider"
import { DefaultIconContext } from "../icons/DefaultIconProvider"
import { AccountDropdown } from "./AccountDropdown"
import { CreateDropdown} from "./CreateDropdown"
import "./Nav.css"

export const Nav = (props) => {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)
  const [ showCreateDropdown, setShowCreateDropdown] = useState(false)
  const [username, setUsername] = useState({})
  const [letter, setLetter] = useState("")
  const [image, setImage] = useState("https://res.cloudinary.com/heymonicakay/image/upload/v1600784857/wideRetriever/7F4591F1-F810-4472-AD7E-F70045A6A887_oq1csy.png")

  const { getCurrentUser, currentUser } = useContext(UserContext)
  const { getDefaultIcons, defaultIcons} = useContext(DefaultIconContext)

  useEffect(()=>{
    getCurrentUser(props.currentUserId)
    getDefaultIcons()
  }, [])

  useEffect(()=>{
    const username = currentUser.username || {}
    const deconUsername = {...username}
    const letter = deconUsername[0]
    setLetter(letter)
  }, [currentUser])

  useEffect(()=>{
    const matchingIcon = defaultIcons.find(di => di.letter === letter) || {}
    setImage(matchingIcon.iconURL)
  }, [letter, defaultIcons])

  const toggleAccount = () => {
    setShowCreateDropdown(false)

    if(showAccountDropdown === false) {
      setShowAccountDropdown(true)
    }
    else {
      setShowAccountDropdown(false)
    }
  }

  const toggleCreate =()=>{
    setShowAccountDropdown(false)

    if (showCreateDropdown === false) {
      setShowCreateDropdown(true)
    }
    else {
      setShowCreateDropdown(false)
    }
  }

  return (
    <>
      <div className="nav">
        <div className="cont--search">
          <PlayerSearch {...props}/>
        </div>
          <div className="nav-group--create">
            <div className={`cont--create ${showCreateDropdown ? "cont--create--open" : "cont--create--collapsed" }`}>
              <CreateDropdown
              showCreateDropdown={showCreateDropdown}
              toggleCreate={toggleCreate}
              {...props} />
            </div>
          </div>
            <div className="create-icon"
              onClick={toggleCreate}>
              <img className="create-icon-url" src="https://res.cloudinary.com/heymonicakay/image/upload/v1600784857/wideRetriever/7F4591F1-F810-4472-AD7E-F70045A6A887_oq1csy.png" alt="" />
            </div>

          <div className="nav-group--account">
            <div className={`cont--account ${showAccountDropdown ? "cont--account--open" : "cont--account--collapsed" }`}>
              <AccountDropdown
              showAccountDropdown={showAccountDropdown}
              toggleAccount={toggleAccount}
              {...props} />
            </div>
        </div>
            <div className="home-icon"
              onClick={toggleAccount}>
              <img className="home-icon-url" src={image} alt="" />
            </div>
      </div>
    </>
  )
}