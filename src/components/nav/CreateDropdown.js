import React from "react"
import { Link } from "react-router-dom"
import "./Nav.css"
export const CreateDropdown = ( {toggleCreate})=> {
  return (
    <>
      <Link className="dropdown-item nav__link nav__link--add-pl"
        to="/players/create"
        onClick={toggleCreate}
        >
          Create Player
      </Link>
      <Link className="dropdown-item nav__link nav__link--add-reminder"
        to="/reminders/create"
        onClick={toggleCreate}
        >
        Set Reminder
      </Link>
      <Link className="dropdown-item nav__link nav__link--add-todo"
        to="/todo/create"
        onClick={toggleCreate}
        >
        Add To Do
      </Link>
      <div className="dropdown-item arrow-up"
        onClick={toggleCreate}
        >
        <img className="arrow-up-img" src="https://res.cloudinary.com/heymonicakay/image/upload/v1600745135/wideRetriever/0D667DFE-7585-4750-9BE6-6767123A225B_seradg.png" alt=""/>
      </div>
    </>
  )
}