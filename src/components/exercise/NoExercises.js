import React from "react"

export const NoExercises = (props) => {
  return (
    <article className="list list--ex">
      <h1 className="h1 no-data-msg no-ex-msg">
        Woof!
      </h1>
      <h3 className="h5 no-data-msg no-ex-msg">
          {props.player.name} doesn't have any exercise sessions, yet!
      </h3>
    </article>
  )
}