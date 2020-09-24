//What the home page will look like with all the items listed
import React, { useContext, useEffect, useState } from "react"
import { Progress } from "./Progress";
import { UserContext } from "../users/UserProvider";
import { ConsumptionContext } from "../consumption/ConsumptionProvider";
import { ItemContext } from "../items/ItemProvider";

export const ProgressList = props => {
    const { consumptions, userConsumptions, getUserConsumptions, getConsumptionByItem, itemConsumptions } = useContext(ConsumptionContext)
    const { getCurrentUser, currentUser } = useContext(UserContext)
    const { getItems, setItems, items } = useContext(ItemContext)

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
                <h1>OVERALL PROGRESS</h1>
            </header>

            <button className="btn__todays_progress" onClick={() => props.history.push("/progress/today")}>
                Today's Consumptions
            </button>
            <button className="btn__todays_progress" onClick={() => props.history.push("/progress/month")}>
                Month's Consumptions
            </button>
            <button className="btn__todays_progress" onClick={() => props.history.push("/progress/week")}>
                Week's Consumptions
            </button>
            <article className="progressList">
                <fieldset>
                    <div className="div__add_consumption">
                        <label htmlFor="itemSelect">Item select: </label>
                        <select name="itemSelect" id="itemSelect" className="form-control"
                            proptype="int"
                            onChange={handleControlledInputChange}>

                            <option value="0">Select a item</option>
                            {userItemObj.map(item => (
                                <option key={item.id} value={item.id}>{item.name} - {item.size} oz</option>

                            ))}
                        </select>
                    </div>
                </fieldset>
                {
                    itemConsumptions.map(item => {
                        let totalItemConsumption = 0
                        let totalCalories = 0
                        let totalSugarIntake = 0
                        let totalCost = 0
                        let hoursSinceConsumed = 0
                        const currentTime = new Date()

                        if (item.id === parseInt(selectedItem.itemSelect)) {

                            item.consumptions.forEach(consumption => {


                                totalItemConsumption += consumption.servings

                                totalCalories = item.calories * totalItemConsumption
                                totalSugarIntake = item.sugar * totalItemConsumption
                                totalCost = item.cost * totalItemConsumption

                            })
                            let hoursSinceConsumed = 0

                            const currentTime = new Date()

                            const sortedConsumptionTimes = item.consumptions.sort((a, b) => { return new Date(b.time) - new Date(a.time) })

                            sortedConsumptionTimes.find(consumption => {
                                const consumptionTime = new Date(consumption.time)
                                return hoursSinceConsumed = (Math.abs(currentTime.getTime() - consumptionTime.getTime()) / (1000 * 60 * 60)).toFixed(1)
                            })

                            return <Progress key={item.id}
                                item={itemFound()}
                                calories={totalCalories}
                                sugar={totalSugarIntake}
                                cost={totalCost}
                                hours={hoursSinceConsumed}
                            />
                        }

                    })
                }
            </article>
        </div>
    )
}