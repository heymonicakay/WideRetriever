import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Nav } from "./nav/Nav"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Retriever.css"

export const Retriever = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("wr__user")) {
                return (
                    <>
                          <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {

                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)