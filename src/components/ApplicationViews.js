import React, {useContext } from "react"
import { Route } from "react-router-dom"
import { Nav } from "./nav/Nav"
import { PlayerForm } from "./players/PlayerForm"
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
import { ExerciseGoalProvider } from "./exerciseGoals/ExerciseGoalProvider"
import { ExerciseGoalForm  } from "./exerciseGoals/ExerciseGoalForm"
import { FollowingProvider } from "./following/FollowingProvider"
import { FollowedPlayerList } from "./following/FollowedPlayerList"
import { DefaultIconProvider } from "./icons/DefaultIconProvider"
import { PlaytimeGoalProvider } from "./playtimeGoals/PlaytimeGoalProvider"
import { PlaytimeGoalForm } from "./playtimeGoals/PlaytimeGoalForm"
import { TrainingGoalProvider } from "./trainingGoals/TrainingGoalProvider"
import { TrainingGoalForm } from "./trainingGoals/TrainingGoalForm"
import { UserDash } from  "./users/Dashboard"
import { ReminderForm } from "./reminders/ReminderForm"
import { ReminderProvider } from "./reminders/ReminderProvider"
import { MeasurementTypeProvider } from "./goals/MeasurementTypeProvider"
import { FrequencyProvider } from "./goals/FrequencyProvider"

export const ApplicationViews = (props) => {
  const currentUserId = parseInt(sessionStorage.getItem("wr__user"))
  return (
    <>
      <UserProvider >
        <DefaultIconProvider>
          <PlayerProvider>
            <FollowingProvider>
              <ReminderProvider>
              <Route
                path = "/"
                render = {props =>
                  <>
                    <nav className="cont--nav">
                      <PlayerSearchDisplay
                        currentUserId={currentUserId}
                        { ...props} />
                      <Nav
                        currentUserId={currentUserId}
                        {...props}
                      />
                    </nav>
                    <div className="main-cont">
                      <div className="followed-player-list-cont">
                        <FollowedPlayerList
                          currentUserId={currentUserId}
                          { ...props} />
                      </div>
                      <Route
                        exact path="/players"
                        render = {
                        props =>
                          <div className="cont--pl">
                            <UserDash
                            currentUserId={currentUserId}
                            { ...props} />
                          </div>
                      }
                      />
                      <div className="reminder-list-cont">
                        <ReminderForm
                          currentUserId={currentUserId}
                          {...props}/>
                      </div>
                    </div>
                  </>
                }/>
              <Route
                exact path="/players/create"
                render = {
                  props =>
                    <div className="cont__form--pl">
                      <PlayerForm
                        currentUserId={currentUserId}
                        { ...props} />
                    </div>
                }
              />

            <PlaytimeProvider>
              <TrainingProvider>
                <TrainingTypeProvider>
                  <ExerciseProvider>
                    <ExerciseTypeProvider>
                      <ExerciseGoalProvider>
                        <PlaytimeGoalProvider>
                          <TrainingGoalProvider>
                            <MeasurementTypeProvider>
                              <FrequencyProvider>

                                <Route
                                  exact path="/players/:playerId(\d+)"
                                  render={
                                    props =>
                                    <div className="cont--pl">
                                      <PlayerDetails
                                        currentUserId={currentUserId}
                                        {...props}
                                        />
                                    </div>
                                  }
                                  />
                              </FrequencyProvider>
                            </MeasurementTypeProvider>
                          </TrainingGoalProvider>
                        </PlaytimeGoalProvider>
                      </ExerciseGoalProvider>
                    </ExerciseTypeProvider>
                  </ExerciseProvider>
                </TrainingTypeProvider>
              </TrainingProvider>
            </PlaytimeProvider>

            <ExerciseProvider>
              <ExerciseTypeProvider>
                <MeasurementTypeProvider>
                  <FrequencyProvider>

                  <Route
                  exact path="/players/exercise/add/:playerId(\d+)"
                  render={
                    props =>
                    <ExerciseForm
                    currentUserId={currentUserId}
                    {...props}/>
                  }
                  />
                  </FrequencyProvider>
                </MeasurementTypeProvider>
              </ExerciseTypeProvider>
            </ExerciseProvider>

            <ExerciseGoalProvider>
              <MeasurementTypeProvider>
                <FrequencyProvider>
                <Route
                      exact path="/players/goals/exercise/add/:playerId(\d+)"
                      render={
                        props =>

                        <ExerciseGoalForm
                        currentUserId={currentUserId}
                        {...props}/>
                      }
                      />
                </FrequencyProvider>
              </MeasurementTypeProvider>
            </ExerciseGoalProvider>

            <TrainingProvider>
              <TrainingTypeProvider>
                <MeasurementTypeProvider>
                  <FrequencyProvider>
                        <Route
                          exact path="/players/training/add/:playerId(\d+)"
                          render={
                            props =>
                            <TrainingForm
                            currentUserId={currentUserId}
                            {...props}/>
                          }
                          />
                    </FrequencyProvider>
                  </MeasurementTypeProvider>
                </TrainingTypeProvider>
              </TrainingProvider>

              <TrainingGoalProvider>
                <MeasurementTypeProvider>
                  <FrequencyProvider>
                    <Route
                        exact path="/players/goals/training/add/:playerId(\d+)"
                        render={
                          props =>

                          <TrainingGoalForm
                          currentUserId={currentUserId}
                          {...props}/>
                        }
                        />
                    </FrequencyProvider>
                  </MeasurementTypeProvider>
              </TrainingGoalProvider>

              <PlaytimeProvider>
                <Route
                  exact path="/players/playtime/add/:playerId(\d+)"
                  render={
                    props =>
                    <PlaytimeForm
                    currentUserId={currentUserId}
                    {...props}/>
                  }
                  />
              </PlaytimeProvider>

              <PlaytimeGoalProvider>
              <Route
                  exact path="/players/goals/playtime/add/:playerId(\d+)"
                  render={
                    props =>

                    <PlaytimeGoalForm
                    currentUserId={currentUserId}
                    {...props}/>
                  }
                  />
              </PlaytimeGoalProvider>

            <Route
              path="/players/edit/:playerId(\d+)"
              render={
                props =>
                <PlayerForm
                currentUserId={currentUserId}
                {...props}
                />
              }
              />

              </ReminderProvider>
            </FollowingProvider>
          </PlayerProvider>
        </DefaultIconProvider>
      </UserProvider>
    </>
  )
}