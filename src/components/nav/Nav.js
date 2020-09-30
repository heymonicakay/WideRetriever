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
            <div className="create-icon"
              onClick={toggleCreate}>
              <img className="create-icon-url" src="https://res.cloudinary.com/heymonicakay/image/upload/v1600784857/wideRetriever/7F4591F1-F810-4472-AD7E-F70045A6A887_oq1csy.png" alt="" />
            </div>
          </div>

          <div className="nav-group--account">
            <div className={`cont--account ${showAccountDropdown ? "cont--account--open" : "cont--account--collapsed" }`}>
              <AccountDropdown
              showAccountDropdown={showAccountDropdown}
              toggleAccount={toggleAccount}
              {...props} />
            </div>
            <div className="home-icon"
              onClick={toggleAccount}>
              <img className="home-icon-url" src="https://res.cloudinary.com/heymonicakay/image/upload/v1600784430/wideRetriever/90E85FCC-F4DF-4AF1-8A15-844FA8C28E7E_ofq71f.png" alt="" />
            </div>

        </div>
      </div>
    </>
  )
}