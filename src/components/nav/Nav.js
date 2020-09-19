import React from "react"
import { Link } from "react-router-dom"
import { PlayerSearch } from "../players/PlayerSearch"
import "./Nav.css"

export const Nav = (props) => {
  const handleLogout = () => {
    sessionStorage.clear()
  }

  return (
    <ul className="nav">
      <div className="cont--search">
        <PlayerSearch {...props}/>
      </div>

      <Link className="nav__link nav__link--logout" to="/" onClick={handleLogout}>
          Logout
      </Link>
      <h1 className="nav__heading">
        Wide Retriever
      </h1>
      <Link className="nav__link nav__link--add-pl" to="/players/create">
        Add Player
      </Link>
      <Link className="nav__link nav__link--home" to="/">
        Home
      </Link>
    </ul>
  )
}