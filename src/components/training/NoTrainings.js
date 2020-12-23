import React from 'react'

export const NoTrainings = (props) => {

    return(
        <article className="list list--tr">
            <h1 className="h1 no-data-msg no-tr-msg" style={{"color": "hsl(173, 27%, 47%)"}}>
                Woof!
                    </h1>
            <h3 className="h5 no-data-msg no-tr-msg" style={{"color": "hsl(173, 27%, 47%)"}}>
                <center>
                    {props.player.name} doesn't have any<br />training sessions, yet!
                </center>
            </h3>
        </article>
    )
}