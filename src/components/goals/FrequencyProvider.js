import React, { useState, useEffect } from "react"

export const FrequencyContext = React.createContext()

export const FrequencyProvider = (props) => {
    const [frequencies, setFrequencies] = useState([])

    const getFrequencies = () => {
        return fetch("http://localhost:8088/frequencies")
            .then(res => res.json())
            .then(setFrequencies)
    }

    const addFrequency = frequencyObj => {
        return fetch("http://localhost:8088/frequencies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(frequencyObj)
        })
            .then(res => res.json())
            .then((res) => {
                const createdFrequency = res
                getFrequencies()
                return createdFrequency
            })
    }

    useEffect(()=>{
      getFrequencies()
    }, [])

    return (
        <FrequencyContext.Provider value={
            {
                frequencies,
                setFrequencies,
                getFrequencies,
                addFrequency,
            }
        }>
            {props.children}
        </FrequencyContext.Provider>
    )
}