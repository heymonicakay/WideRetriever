import React, { useState, useEffect } from "react"
export const DateContext = React.createContext()

export const DateProvider = (props) => {
    const [dateObj, setDateObj] = useState({})
    const [startOfTheWeek, setStartOfTheWeek] = useState(0)
    const [filteredByThisWeek, setFilteredByThisWeek] = useState([])
    const [filteredByToday, setFilteredByToday] = useState([])

    const [thisSundayObj, setThisSundayObj] = useState({})
    const [thisMondayObj, setThisMondayObj] = useState({})
    const [thisTuesdayObj, setThisTuesdayObj] = useState({})
    const [thisWednesdayObj, setThisWednesdayObj] = useState({})
    const [thisThursdayObj, setThisThursdayObj] = useState({})
    const [thisFridayObj, setThisFridayObj] = useState({})
    const [thisSaturdayObj, setThisSaturdayObj] = useState({})

    const [thisSaturDate, setThisSaturDate] = useState(0)
    const [thisSunDate, setThisSunDate] = useState(0)
    const [thisMonDate, setThisMonDate] = useState(0)
    const [thisTuesDate, setThisTuesDate] = useState(0)
    const [thisWedDate, setThisWedDate] = useState(0)
    const [thisThursDate, setThisThursDate] = useState(0)
    const [thisFriDate, setThisFriDate] = useState(0)

    const [date, setDate] = useState(new Date())
    const [currentTimestamp, setCurrentTimestamp] = useState(Date.now())
    const [thisWeekstart, setThisWeekstart] = useState(0) /*returns date int*/

    const getCurrentTimestamp = () => {
      const currentTimestamp = Date.now()
      setCurrentTimestamp(currentTimestamp)
    }

    const getThisWeekStart = () => {
      let date = new Date()
      const thisWeekStart = date.getDate() - date.getDay()
      setThisWeekstart(thisWeekStart)
    }

    const getThisSundayObj = () => {
      let date = new Date();
      let thisWeekStart = date.getDate() - date.getDay();
      const thisSundayObj = date.setDate(thisWeekstart);
      const thisSunDate = thisSundayObj.getDate()
    setThisSundayObj(thisSundayObj)
    setThisSunDate(thisSunDate)
    }

    const getThisMondayObj = () => {
      let date = new Date();
      let thisWeekStart = date.getDate() - date.getDay();
      const thisMondayObj = date.setDate(thisWeekstart + 1);
      const thisMonDate = thisMondayObj.getDate()
    setThisMondayObj(thisMondayObj)
    setThisMonDate(thisMonDate)
    }

    const getThisTuesdayObj = () => {
      let date = new Date();
      let thisWeekStart = date.getDate() - date.getDay();
      const thisTuesdayObj = date.setDate(thisWeekstart + 2);
      const thisTuesDate = thisTuesdayObj.getDate()
    setThisTuesdayObj(thisTuesdayObj)
    setThisTuesDate(thisTuesDate)
    }

    const getThisWednesdayObj = () => {
      let date = new Date();
      let thisWeekStart = date.getDate() - date.getDay();
      const thisWednesdayObj = date.setDate(thisWeekstart + 3);
      const thisWedDate = thisWednesdayObj.getDate()
    setThisWednesdayObj(thisWednesdayObj)
    setThisWedDate(thisWedDate)
    }

    const getThisThursdayObj = () => {
      let date = new Date();
      let thisWeekStart = date.getDate() - date.getDay();
      const thisThursdayObj = date.setDate(thisWeekstart + 4);
      const thisThursDate = thisThursdayObj.getDate()
    setThisThursdayObj(thisThursdayObj)
    setThisThursDate(thisThursDate)
    }

    const getThisFridayObj = () => {
      let date = new Date();
      let thisWeekStart = date.getDate() - date.getDay();
      const thisFridayObj = date.setDate(thisWeekstart + 5);
      const thisFriDate = thisFridayObj.getDate()
    setThisFridayObj(thisFridayObj)
    setThisFriDate(thisFriDate)
    }

    const getThisSaturdayObj = () => {
      let date = new Date();
      let thisWeekStart = date.getDate() - date.getDay();
      const thisSaturdayObj = date.setDate(thisWeekstart + 6);
      const thisSaturDate = thisSaturdayObj.getDate()
    setThisSaturdayObj(thisSaturdayObj)
    setThisSaturDate(thisSaturDate)
    }

    const [thisMonthInt, setThisMonthInt] = useState(new Date().getMonth())

    const [weekArray, setWeekArray] = useState(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])

    const [weekArrayLetters, setWeekArrayLetters] = useState([ "Su", "M", "T", "W", "Th", "F", "Sa"])

    const [monthArray, setMonthArray] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])

    const [monthArrayShort, setMonthArrayShort] = useState(["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"])

    const todayObj = new Date(Date.now())

    const getDateObj = (timestamp) => {
      const dateObj = new Date(timestamp)
      setDateObj(dateObj)
    }
    const getThisMonthInt = (date) => {
      const thisMonthInt = date.getMonth()
      setThisMonthInt(thisMonthInt)
    }
    const thisMonthVar = monthArray[thisMonthInt]
    const thisMonthShortVar = monthArrayShort[thisMonthInt]

    const getStartOfTheWeek = (date) => {
      const startOfTheWeek = date.getDate() - date.getDay()
      setStartOfTheWeek(startOfTheWeek)
    }

    const filterByToday = (activityArray) => {
      const filteredByToday = activityArray.filter(a => a.date === todayObj) || []
      return filteredByToday
    }

    const filterByThisWeek = (activityArray) => {
      const filteredByThisWeek = activityArray.map(a => {
        const actDate = new Date(a.timestamp).getDate()
        if(actDate === thisSunDate || thisMonDate || thisTuesDate || thisWedDate || thisThursDate || thisFriDate || thisSaturDate) {
          return a
        }
      })
      return filteredByThisWeek
    }


    return (
        <DateContext.Provider value={{
          date, setDate,
          getThisWeekStart,
          thisWeekstart, setThisWeekstart,
          getStartOfTheWeek, startOfTheWeek, setStartOfTheWeek,
          currentTimestamp, setCurrentTimestamp, getCurrentTimestamp,
          todayObj,
          getDateObj, dateObj, setDateObj,
          monthArray, setMonthArray, monthArrayShort, setMonthArrayShort,
          weekArray, setWeekArray, weekArrayLetters, setWeekArrayLetters,
          getThisMonthInt, thisMonthInt, setThisMonthInt,
          thisMonthVar, thisMonthShortVar, thisSundayObj, thisMondayObj, thisTuesdayObj, thisWednesdayObj, thisThursdayObj, thisFridayObj, thisSaturdayObj, thisSunDate, thisMonDate, thisTuesDate, thisWedDate, thisThursDate, thisFriDate, thisSaturDate, filterByToday, filteredByToday, setFilteredByToday, filterByThisWeek, filteredByThisWeek, setFilteredByThisWeek
        }}>
            {props.children}
        </DateContext.Provider>
    )
}