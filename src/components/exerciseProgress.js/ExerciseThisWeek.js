import React, { useContext, useEffect, useState } from "react"
import { WeekProgress } from "./WeekProgress";
import { PlayerContext } from "../players/PlayerProvider";
import { ExerciseContext } from "../exercises/ExerciseContext";

export const WeekProgressList = props => {
    const { getUserConsumptions, getConsumptionByItem, itemConsumptions } = useContext(ConsumptionContext)
    const { getCurrentUser} = useContext(UserContext)
    const { getItems} = useContext(ItemContext)

    const currentUserId = parseInt(localStorage.getItem("user"))

    const userItemObj = itemConsumptions.filter(item => {
        const userItemFound = item.consumptions.find(c => {
            return c.userId === currentUserId
        }) || {}
        const userItemId = userItemFound.userId
        return userItemId
    })


    const [selectedItem, setSelectedItem] = useState([])

    const handleControlledInputChange = (itemObj) => {
        const filteredItem = Object.assign({}, selectedItem)
        filteredItem[itemObj.target.name] = itemObj.target.value
        setSelectedItem(filteredItem)
    }

    const itemFound = () => {
        const foundItem = itemConsumptions.find(c => {
            return c.id === parseInt(selectedItem.itemSelect)
        })
            || {}
        return foundItem
    }
    useEffect(() => {
        getItems()
        getConsumptionByItem()
        getCurrentUser()
        getUserConsumptions(currentUserId)
    }, [])

    return (
        <div>
            <header className="header">
                <h1>Week's PROGRESS</h1>
            </header>
            <button className="btn__todays_progress" onClick={() => props.history.push("/progress")}>
                Overall Consumptions
            </button>
            <button className="btn__todays_progress" onClick={() => props.history.push("/progress/today")}>
                Today's Consumptions
            </button>
            <button className="btn__todays_progress" onClick={() => props.history.push("/progress/month")}>
                Month's Consumptions
            </button>
            <article className="progressList">
                
                {
                    itemConsumptions.map(item => {

                        const currentTime = new Date()
                        const weekConsumptionTime = currentTime.setDate(currentTime.getDate() - 7)

                        if (item.id === parseInt(selectedItem.itemSelect)) {

                            const weeksConsumptionsArray = item.consumptions.filter(consumption => {
                                const consumptionTime = new Date(consumption.time)
                                const consumptionTimeArray = consumptionTime > new Date(weekConsumptionTime) && currentTime < consumptionTime
                                // console.log(consumptionTimeArray)
                                return consumptionTimeArray
                                })
                                let weeksConsumptionsObj = {}

                                weeksConsumptionsArray.forEach(consumption => {
                                    console.log(weeksConsumptionsArray)

                                        if (Object.keys(weeksConsumptionsObj).includes(consumption.itemId.toString())) {
                                            const totalWeekCalories = (consumption.servings * item.calories) + weeksConsumptionsObj[consumption.itemId].calories
                                            const totalWeekSugar = (consumption.servings * item.sugar) + weeksConsumptionsObj[consumption.itemId].sugar
                                            const totalWeekCost = (consumption.servings * item.cost) + weeksConsumptionsObj[consumption.itemId].cost
                                            weeksConsumptionsObj[consumption.itemId] = { "calories": totalWeekCalories, "sugar": totalWeekSugar, "cost": totalWeekCost }
                                        } else {
                                            weeksConsumptionsObj[consumption.itemId.toString()] = { "calories": (consumption.servings * item.calories), "sugar": (consumption.servings * item.sugar), "cost": (consumption.servings * item.cost) }


                                        }
                                        // hoursSinceConsumed = (Math.abs(currentTime.getTime() - consumptionTime.getTime())/ (1000 * 60 * 60)).toFixed(1)


                            })
                            return Object.keys(weeksConsumptionsObj).map(key => {
                                return <WeekProgress key={key}
                                    item={itemFound()}
                                    calories={weeksConsumptionsObj[key].calories}
                                    sugar={weeksConsumptionsObj[key].sugar}
                                    cost={weeksConsumptionsObj[key].cost}
                                // hours={hoursSinceConsumed}
                                />
                            })
                        }
                    }
                    )

                }
            </article>
        </div>
    )
}