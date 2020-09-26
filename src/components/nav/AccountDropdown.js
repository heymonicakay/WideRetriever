import React from "react"
import { Link } from "react-router-dom"
import "./Nav.css"

export const AccountDropdown = ({toggleAccount})=> {
  const handleLogout = () => {
    sessionStorage.clear()
  }

  return (
    <>
        <Link className="nav__link nav__link--home dropdown-item"
          to="/players"
          onClick={()=>{
            toggleAccount()
          }}>
            Home
        </Link>
        <Link className="nav__link nav__link--logout dropdown-item ddi-logout"
          to="/players"
          onClick={()=>{
            toggleAccount()
            handleLogout()
          }}>
            Logout
        </Link>
      <div className="dropdown-item arrow-up"
        onClick={toggleAccount}
        >
        <img className="arrow-up-img" src="https://res.cloudinary.com/heymonicakay/image/upload/v1600745135/wideRetriever/0D667DFE-7585-4750-9BE6-6767123A225B_seradg.png" alt=""/>
      </div>
    </>
  )
}

