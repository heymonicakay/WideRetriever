import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Login.css"


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
    <main className="cont--login">

      <dialog className="dialog dialog--auth" ref={existDialog}>
          <div>
            User does not exist
          </div>
          <button className="btn--close" onClick={e => existDialog.current.close()}>
            Close
          </button>
      </dialog>

      <dialog className="dialog dialog--password" ref={pwDialog}>
          <div>
            Password does not match
          </div>
          <button className="btn--close" onClick={e => pwDialog.current.close()}>
            Close
          </button>
      </dialog>

      <section>
        <form className="form form--login" onSubmit={handleLogin}>
          <h1>
            Wide Retriever
          </h1>

          <h2>
            login
          </h2>

          <fieldset>
            <label htmlFor="inputUsername">
              Username
            </label>
            <input ref={username} type="username" id="username" className="input input--username" placeholder="Username" required autoFocus />
          </fieldset>

          <fieldset>
            <label htmlFor="inputPassword"> Password </label>
            <input ref={pw} type="pw" id="pw" className="input--pw" placeholder="Password" required />
          </fieldset>

          <fieldset>
            <button type="submit">
              Login
            </button>
          </fieldset>

        </form>
      </section>

      <section className="link--reg">
        <Link to="/register">
          I'm new!
        </Link>
      </section>

    </main>
  )
}