import React, { useRef } from "react"
import "./Login.css"

export const Register = (props) => {
  const firstName = useRef()
  const lastName = useRef()
  const username = useRef()
  const email = useRef()
  const pw = useRef()
  const verifyPw = useRef()
  const pwDialog = useRef()

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?username=${username.current.value}`)
      .then(_ => _.json())
      .then(user => !!user.length)
  }

  const handleRegister = (e) => {
    e.preventDefault()

      if (pw.current.value === verifyPw.current.value) {
        existingUserCheck()
          .then(() => {
            fetch("http://localhost:8088/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email: email.current.value,
                password: pw.current.value,
                name: `${firstName.current.value} ${lastName.current.value}`
              })
            })
          .then(_ => _.json())
          .then(createdUser => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("wr__user", createdUser.id)
              props.history.push("/")
            }
          })
          })
      }
      else {
        pwDialog.current.showModal()
      }
  }

  return (
    <main style={{ textAlign: "center" }}>

      <dialog className="dialog dialog--pw" ref={ pwDialog }>
        <div>Passwords do not match</div>
        <button className="button--close" onClick={e => pwDialog.current.close()}>Close</button>
      </dialog>

        <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Register for NSS Kennels
        </h1>

        <fieldset>
          <label htmlFor="firstName"> First Name </label>
          <input ref={ firstName } type="text" name="firstName" className="input input--first" placeholder="First name" required autoFocus />
        </fieldset>

        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input ref={ lastName } type="text" name="lastName" className="input input--last" placeholder="Last name" required />
        </fieldset>

        <fieldset>
          <label htmlFor="inputUsername"> Username </label>
          <input ref={ username } type="username" name="username" className="input input--username" placeholder="Username" required />
        </fieldset>

        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input ref={ email } type="email" name="email" className="input input--email" placeholder="Email address" required />
        </fieldset>

        <fieldset>
          <label htmlFor="inputPw"> Password </label>
          <input ref={ pw } type="pw" name="pw" className="input input--pw" placeholder="Password" required />
        </fieldset>

        <fieldset>
          <label htmlFor="verifyPw"> Verify Password </label>
          <input ref={ verifyPw } type="pw" name="verifyPw" className="input input--v-pw" placeholder="Verify password" required />
        </fieldset>

        <fieldset>
          <button type="submit">
              Sign in
          </button>
        </fieldset>
      </form>
    </main>
  )
}

