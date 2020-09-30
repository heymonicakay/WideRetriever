import React from "react"

export const NoPlaytimes = (props) => {
  return (
    <article className="list list--ex">
      <h1 className="h1 no-data-msg no-pt-msg">
        Woof!
      </h1>
      <h3 className="h5 no-data-msg no-pt-msg">
          {props.player.name} doesn't have any playtimes, yet!
      </h3>
    </article>
  )
}