import React, { useState } from "react"
export const DefaultIconContext = React.createContext()

export const DefaultIconProvider = (props) => {
    const [defaultIcons, setDefaultIcons] = useState([])

    const getDefaultIcons = () => {
        return fetch("http://localhost:8088/defaultIcons")
            .then(res => res.json())
            .then(setDefaultIcons)
    }

    const getDefaultIconByInitial = (M) => {
      return fetch(`http://localhost:8088/defaultIcons/${M}`)
          .then(res => res.json())
  }

    return (
        <DefaultIconContext.Provider value={{
            defaultIcons,
            setDefaultIcons,
            getDefaultIcons,
            getDefaultIconByInitial,
        }}>
            {props.children}
        </DefaultIconContext.Provider>
    )
}