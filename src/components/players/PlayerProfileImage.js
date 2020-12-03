//IMPORTS
import React, { useEffect, useState } from "react"
import { FollowButton } from "../following/FollowButton"
import { PlayerActivityButtons } from "./PlayerActivityButtons"
import Default from "../images/default_photo.png"

export const PlayerProfileImage = (props) => {
//STATE
    const [image, setImage] = useState(Default)
//EFFECT
    useEffect(()=>{
        if(props.player && props.playerImg){
            setImage(props.playerImg)
        }
    }, [props.player])
//HANDLE
    const handleEditPlayer = () => {
        const id = props.playerId
        if(props.isOwner){
            props.history.push(`/players/edit/${id}`)
        }
    }
//RETURN
    return (
        <div
        className="pl-card-top">
            <div
            className="player-img-edit-follow-contain">
                <div
                className={`
                    ${props.isOwner
                    ? "cont--img--detail"
                    : "cont--img--detail-other"}
                `}>
                    <FollowButton
                    player={props.player}
                    playerId={props.playerId}
                    currentUserId={props.currentUserId}
                    isOwner={props.isOwner}
                    {...props}/>

                    <PlayerActivityButtons
                    playerId={props.playerId}
                    isOwner={props.isOwner}
                    {...props}/>

                    <img
                    title={
                        props.isOwner
                        ? "Double click to edit player info."
                        : "Image"
                    }
                    src={image}
                    className={`
                        ${props.isOwner
                        ? "pl-card-img-detail"
                        : "pl-card-img-detail-other"}
                    `}
                    alt=""
                    onDoubleClick={handleEditPlayer}/>
                    <p
                    className="pl-card__header--name">
                        {props.player.name}
                    </p>
                </div>
            </div>
        </div>

    )
}