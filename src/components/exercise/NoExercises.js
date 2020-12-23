import React from "react"
export const NoExercises = (props) => {
    return (
        <article className="list list--ex">
            <h1 className="h1 no-data-msg no-ex-msg" style={{"color": "hsl(173, 27%, 47%)"}}>
                Woof!
                    </h1>
            <h3 className="h5 no-data-msg no-ex-msg" style={{"color": "hsl(173, 27%, 47%)"}}>
                <center>
                    {props.player.name} doesn't have any<br />exercise sessions, yet!
                </center>
            </h3>
        </article>
    )
}