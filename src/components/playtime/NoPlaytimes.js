import React from "react"

export const NoPlaytimes = (props) => {
    return (
        <article className="list list--ex">
            <h1 className="h1 no-data-msg no-pt-msg" style={{"color": "hsl(173, 27%, 47%)"}}>
                Woof!
            </h1>
            <h3 className="h5 no-data-msg no-pt-msg" style={{"color": "hsl(173, 27%, 47%)"}}>
                <center>
                    {props.player.name} hasn't played any<br />games of catch, yet!
                </center>
            </h3>
        </article>
    )
}