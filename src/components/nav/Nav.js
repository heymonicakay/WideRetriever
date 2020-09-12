import React from "react"
import { Link } from "react-router-dom"
import { PlayerSearch } from "../players/PlayerSearch"
import "./Nav.css"

export const Nav = (props) => {
  const handleLogout = () => {
    localStorage.clear()
  }

  return (
    <ul className="nav">
      <PlayerSearch/>
      <Link className="nav__link nav__link--logout" to="/" onClick={handleLogout}>
          Logout
      </Link>
      <div className="nav__heading">
        Wide Retriever
      </div>
      <Link className="nav__link nav__link--add-pl" to="/players/create">
        Add Player
      </Link>
      <Link className="nav__link nav__link--home" to="/">
        Home
      </Link>
    </ul>
  )
}