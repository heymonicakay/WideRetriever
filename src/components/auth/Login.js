import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Login.css"
import "./Dialog.css"


export const Login = props => {
  const username = useRef()
  const pw = useRef()
  const existDialog = useRef()
  const pwDialog = useRef()

  const existingUserCheck = () => {
      return fetch(`http://localhost:8088/users?username=${username.current.value}`)
          .then(_ => _.json())
          .then(user => user.length ? user[0] : false)
  }

  const handleLogin = (e) => {
    e.preventDefault()

    existingUserCheck()
      .then(exists => {
        if (exists && exists.password === pw.current.value) {
          localStorage.setItem("wr__user", exists.id)
          props.history.push("/")
        }
        else if (exists && exists.pw !== pw.current.value) {
          pwDialog.current.showModal()
        }
        else if (!exists) {
          existDialog.current.showModal()
        }
      })
  }

  return (
    <div className="cont--login">

      <dialog className="dialog dialog--auth" ref={existDialog}>
          <div>
            Oops! Looks like that username doesn't exist. Would you like to register a new account?
          </div>

          <button className="btn btn--close">
            <Link className="link link--reg" to="/register">
              Yes, take me to the registration page!
            </Link>
          </button>
          <div className="link link--login-retry" onClick={e => existDialog.current.close()}>
            No, I'll try logging in again.
          </div>
      </dialog>

      <dialog className="dialog dialog--password"
        ref={pwDialog}>
          <div className="cont__dialog-msg--pw">
            <p className="dialog-msg--text--pw">
              Oops!
            </p>
            <p className="dialog-msg--text--pw">
              That's not the right password.
            </p>
            <p className="dialog-msg--text--pw">
            Please try again.
            </p>
            <button className="btn btn--close" onClick={e => pwDialog.current.close()}>
              Try again.
            </button>
          </div>
      </dialog>

      <section className="form">
          <h1 className="h1 h1__form h1__form--login">
            Wide Retriever
          </h1>

          <h2 className="h2 h2__form h2__form--login">
            Login
          </h2>

          <input ref={username} type="username" id="username" className="input input--username" placeholder="Username" required autoFocus />

          <input ref={pw} type="password" id="pw" className="input--pw" placeholder="Password" required />

          <button type="button" className="btn btn--login" onClick={handleLogin}>
              Login
          </button>
          <Link className="link link--reg" to="/register">
              I'm new!
          </Link>

      </section>



    </div>
  )
}