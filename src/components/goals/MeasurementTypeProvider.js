import React, { useState } from "react"

export const MeasurementTypeContext = React.createContext()

export const MeasurementTypeProvider = (props) => {
    const [measurementTypes, setMeasurementTypes] = useState([])

    const getMeasurementTypes = () => {
        return fetch("http://localhost:8088/measurementTypes")
            .then(res => res.json())
            .then(setMeasurementTypes)
    }

    const addMeasurementType = measurementTypeObj => {
        return fetch("http://localhost:8088/measurementTypes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(measurementTypeObj)
        })
            .then(res => res.json())
            .then((res) => {
                const createdMeasurementType = res
                getMeasurementTypes()
                return createdMeasurementType
            })
    }

    return (
        <MeasurementTypeContext.Provider value={
            {
                measurementTypes,
                setMeasurementTypes,
                getMeasurementTypes,
                addMeasurementType,
            }
        }>
            {props.children}
        </MeasurementTypeContext.Provider>
    )
}