import React, { useState } from "react";
import Training from "../icons/icon_bone_t.png";
import Exercise from "../icons/icon_paw_t.png";
import Playtime from "../icons/icon_tennis_t.png";
import Plus from "../icons/plus_wv.png";
import "./PlayerActivityButtons.css";

export const PlayerActivityButtons = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = (activity) => {
    const id = props.playerId;
    props.history.push(`/players/${activity}/add/${id}`);
    };

    const ActButtonValidation = () => {
        if(props.isOwner){
            return (
                <>
                    <div
                    title="Click to log a new activity."
                    className={`plus-sign
                        ${isOpen
                        ? "rotate"
                        : ""}
                    `}
                    onClick={toggleOpen}>
                        <img
                        src={Plus}
                        alt=""
                        className={`plus-sign-img
                            ${isOpen
                            ? "rotate"
                            : ""}
                        `}/>
                    </div>
                    <div
                    title="Log Exercise"
                    className={`add-exercise
                        ${isOpen
                        ? "down-left"
                        : ""}
                    `}
                    onClick={() => handleClick("exercise")}>
                        <img
                        src={Exercise}
                        alt=""
                        className={`add-exercise-img
                            ${isOpen
                            ? "down-left"
                            : ""}
                        `}/>
                    </div>
                    <div
                    title="Log Playtime"
                    className={`add-playtime
                        ${isOpen
                        ? "out-left"
                        : ""}
                    `}
                    onClick={() => handleClick("playtime")}>
                        <img
                        src={Playtime}
                        alt=""
                        className={`add-playtime-img
                            ${isOpen
                            ? "out-left"
                            : ""}
                        `}/>
                    </div>
                    <div
                    title="Log Training"
                    className={`add-training
                        ${isOpen
                        ? "up-left"
                        : ""}
                    `}
                    onClick={() => handleClick("training")}>
                        <img
                        src={Training}
                        alt=""
                        className={`add-training-img
                            ${isOpen
                            ? "up-left"
                            : ""}
                        `}/>
                    </div>
            </>
        );
        }
        else{
            return null
        }
    }
    return (
        <>
        <ActButtonValidation />
        </>
    )
};
