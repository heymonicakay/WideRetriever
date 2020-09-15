import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Retriever.css"

export const Retriever = () => (
    <>
        <Route render={() => {
            if (sessionStorage.getItem("wr__user")) {
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