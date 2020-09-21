import React from "react"
import { Route } from "react-router-dom"
import { Nav } from "./nav/Nav"
import { PlayerForm } from "./players/PlayerForm"
import { PlayerList } from "./players/PlayerList"
import { PlayerProvider } from "./players/PlayerProvider"
import { PlayerDetails } from "./players/PlayerDetails"
import { PlayerSearchDisplay } from "./players/PlayerSearchDisplay"
import { PlaytimeProvider } from "./playtime/PlaytimeProvider"
import { PlaytimeForm } from "./playtime/PlaytimeForm"
import { TrainingProvider } from "./training/TrainingProvider"
import { TrainingForm } from "./training/TrainingForm"
import { TrainingTypeProvider } from "./trainingType/TrainingTypeProvider"
import { UserProvider } from "./users/UserProvider"
import { ExerciseProvider } from "./exercise/ExerciseProvider"
import { ExerciseForm } from "./exercise/ExerciseForm"
import { ExerciseTypeProvider } from "./exerciseType/ExerciseTypeProvider"
import { FollowingProvider } from "./following/FollowingProvider"
import { FollowedPlayerList } from "./following/FollowedPlayerList"

export const ApplicationViews = (props) => {

  return (
    <>
      <UserProvider>
        <PlayerProvider>
          <FollowingProvider>
            <Route
              path = "/"
              render = {
                props =>
                  <>
                    <PlayerSearchDisplay
                    { ...props} />
                    <nav className="cont--nav">
                      <Nav
                      {...props} />
                    </nav>
                  </>
              }
            />
            <Route
              exact path = "/"
              render = {
                props =>
                  <>
                    <div className="main-cont">

                      <div className="followed-player-list-cont">
                        <FollowedPlayerList
                        { ...props} />
                      </div>
                      <div className="cont--pl">
                        <PlayerList
                        { ...props} />
                      </div>
                    </div>
                  </>
              }
            />
            <Route
              exact path="/players/create"
              render = {
                props =>
                  <div className="cont__form--pl">
                    <PlayerForm
                    { ...props} />
                  </div>
              }
            />

          <PlaytimeProvider>
            <TrainingProvider>
              <TrainingTypeProvider>
                <ExerciseProvider>
                  <ExerciseTypeProvider>

                    <Route
                      exact path="/players/:playerId(\d+)"
                      render={
                        props =>
                        <div className="cont--pl-view">
                          <PlayerDetails
                          {...props} />
                        </div>
                      }
                      />
                  </ExerciseTypeProvider>
                </ExerciseProvider>
              </TrainingTypeProvider>
            </TrainingProvider>
          </PlaytimeProvider>

          <ExerciseProvider>
            <ExerciseTypeProvider>
                <Route
                exact path="/players/exercise/add/:playerId(\d+)"
                render={
                  props =>
                  <ExerciseForm {...props}/>
                }
                />
            </ExerciseTypeProvider>
          </ExerciseProvider>

          <TrainingProvider>
            <TrainingTypeProvider>
                      <Route
                        exact path="/players/training/add/:playerId(\d+)"
                        render={
                          props =>
                          <TrainingForm {...props}/>
                        }
                        />
              </TrainingTypeProvider>
            </TrainingProvider>

            <PlaytimeProvider>
              <Route
                exact path="/players/playtime/add/:playerId(\d+)"
                render={
                  props =>
                  <PlaytimeForm
                  {...props}/>
                }
                />
            </PlaytimeProvider>

          <Route
            path="/players/edit/:playerId(\d+)"
            render={
              props => <PlayerForm {...props} />
            }
          />
          </FollowingProvider>
        </PlayerProvider>
      </UserProvider>
    </>
  )
}