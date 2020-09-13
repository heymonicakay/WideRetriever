import React from "react"
import { Route } from "react-router-dom"
import { Nav } from "./nav/Nav"
import { PlayerForm } from "./players/PlayerForm"
import { PlayerList } from "./players/PlayerList"
import { PlayerProvider } from "./players/PlayerProvider"
import { PlayerDetails } from "./players/PlayerDetails"
import { PlaytimeProvider } from "./playtime/PlaytimeProvider"
import { PlaytimeList } from "./playtime/PlaytimeList"

export const ApplicationViews = (props) => {
  return (
    <>
      <PlayerProvider>
        <Route path = "/" render = {props =>
            <nav className="cont--nav">
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

        <Route exact path="/players/create" render = {props =>
          <div className="cont__form--pl">
            <PlayerForm { ...props} />
          </div>
        } />
        <PlaytimeProvider>
          <Route path="/players/:playerId(\d+)" render={
            props =>
            <div className="cont--pl-view">
            <PlayerDetails {...props} />
            <PlaytimeList {...props} />
            </div>
          } />
        </PlaytimeProvider>

        <Route path="/players/edit/:playerId(\d+)" render={
          props => <PlayerForm {...props} />
        } />

      </PlayerProvider>
    </>
  )
}