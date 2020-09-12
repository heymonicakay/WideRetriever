import React, { useContext, useState, useEffect } from "react"
import { PlayerContext } from "./PlayerProvider"


export const PlayerForm = (props) => {
  const { addPlayer, players, updatePlayer, getPlayers } = useContext(PlayerContext)

  const [player, setPlayer] = useState({})

  const editMode = props.match.params.hasOwnProperty("playerId")

  const handleControlledInputChange = (event) => {
    const newPlayer = Object.assign({}, player)
    newPlayer[event.target.name] = event.target.value
    setPlayer(newPlayer)
  }

  const getPlayerInEditMode = () => {
    if (editMode) {
      const playerId = parseInt(props.match.params.playerId)
      const selectedPlayer = players.find(p => p.id === playerId) || {}
      setPlayer(selectedPlayer)
    }
  }
  useEffect(() => {
    getPlayers()
  }, [])

  useEffect(() => {
    getPlayerInEditMode()
  }, [players])


  const constructNewPlayer = () => {

    const userId = parseInt(localStorage.getItem("wr__user"))

    if (editMode) {
      updatePlayer({
        id: player.id,
        userId: userId,
        name: player.name,
        breed: player.breed,
        age: player.age,
        number: player.number
      })
      .then(() => props.history.push("/"))
    }
    else {
      addPlayer({
        userId: userId,
        name: player.name,
        breed: player.breed,
        age: player.age,
        number: player.number
      })
      .then(() => props.history.push("/"))
    }
  }

  return (
    <form className="form form-pl">

      <h2 className="h2 header header__form header__form--pl">
        {editMode
          ? "Update Player"
          : "Add Player"
        }
      </h2>
      
      <input name="file" type="file" className="file-upload" data-cloudinary-field="image_id" data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"/>

      <fieldset>
        <div className="form-pl__group form-pl__group--name">
          <label htmlFor="name">
            Player name:
          </label>
          <input type="text" name="name" required autoFocus className="form-pl__ctrl form-pl__ctrl--name" placeholder="Name" defaultValue={player.name} onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

        <fieldset>
          <div className="form-pl__group form-pl__group--breed">
            <label htmlFor="breed">
              Player breed:
            </label>
            <input type="text" name="breed" required className="form-pl__ctrl form-pl__ctrl--breed" placeholder="Breed" defaultValue={player.breed} onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-pl__group form-pl__group--age">
            <label htmlFor="age">
              Age:
            </label>
            <input type="text" name="age" required className="form-pl__ctrl form-pl__ctrl--age" placeholder="Player age" defaultValue={player.age} onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <div className="form-pl__group form-pl__group--number">
            <label htmlFor="number">
              Number:
            </label>
            <input type="text" name="number" required className="form-pl__ctrl form-pl__ctrl--number" placeholder="Player number" defaultValue={player.number} onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>

        <button type="submit" className="btn btn__sbmt btn__sbmt--pl" onClick={e => {
            e.preventDefault()
            constructNewPlayer()
        }}>
          {editMode
            ? "Update"
            : "Submit"
          }
        </button>

      </form>
  )
}