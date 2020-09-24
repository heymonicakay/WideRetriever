import React, { useState } from "react"
export const DefaultIconContext = React.createContext()

export const DefaultIconProvider = (props) => {
    const [defaultIcons, setDefaultIcons] = useState([])
    const [searchTerms, setTerms] = useState("")

    const getDefaultIcons = () => {
        return fetch("http://localhost:8088/defaultIcons")
            .then(res => res.json())
            .then(setDefaultIcons)
    }

    const getDefaultIconById = (id) => {
      return fetch(`http://localhost:8088/defaultIcons/${id}`)
          .then(res => res.json())
  }

    return (
        <DefaultIconContext.Provider value={{
            defaultIcons,
            setDefaultIcons,
            getDefaultIcons,
            getDefaultIconById,
            searchTerms,
            setTerms
        }}>
            {props.children}
        </DefaultIconContext.Provider>
    )
}