import React from "react"
import { Route } from "react-router-dom"
import { Nav } from "./nav/Nav"
import { PlayerForm } from "./players/PlayerForm"
import { PlayerList } from "./players/PlayerList"
import { PlayerProvider } from "./players/PlayerProvider"



export const ApplicationViews = (props) => {
  return (
    <>
      <PlayerProvider>
        <Route path = "/" render = {props =>
            <nav className="cont-nav">
              <Nav {...props} />
            </nav>
        } />

        <Route exact path = "/" render = {props =>
          <div className="cont--pl">
            <PlayerList { ...props} />
          </div>
              } />

        <Route exact path="/players/create" render = {props =>
          <div className="cont__form--pl">
            <PlayerForm { ...props} />
          </div>
        } />

      </PlayerProvider>
    </>
  )
}