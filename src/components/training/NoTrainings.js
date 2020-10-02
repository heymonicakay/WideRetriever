import React from 'react'

export const NoTrainings = (props) => {

  return(
    <article className="list list--tr">
      <h1 className="h1 no-data-msg no-tr-msg">
        Woof!
      </h1>
      <h3 className="h5 no-data-msg no-tr-msg">
          {props.player.name} doesn't have any training sessions, yet!
      </h3>
    </article>
  )
}