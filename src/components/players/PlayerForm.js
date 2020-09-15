import React, { useContext, useState, useEffect } from "react"
import { PlayerContext } from "./PlayerProvider"
import "./PlayerForm.css"


export const PlayerForm = (props) => {
  const { addPlayer, players, updatePlayer, getPlayers } = useContext(PlayerContext)

  const [player, setPlayer] = useState({})

  const editMode = props.match.params.hasOwnProperty("playerId")

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState("")

  const handleControlledInputChange = (event) => {
    const newPlayer = Object.assign({}, player)
    newPlayer[event.target.name] = event.target.value
    setPlayer(newPlayer)
  }

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'wideRetriever')
    setLoading(true)

    const res = await fetch("	https://api.cloudinary.com/v1_1/heymonicakay/image/upload",
    {
      method: 'POST',
      body: data
    })

    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
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

    const userId = parseInt(sessionStorage.getItem("wr__user"))

    if (editMode) {
      updatePlayer({
        id: player.id,
        playerImg: image,
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
        playerImg: image,
        name: player.name,
        breed: player.breed,
        age: player.age,
        number: player.number
      })
      .then(() => props.history.push("/"))
    }
  }

  return (
    <div className="cont--form-pl">

      <section className="form">

      <h2 className="h2 header header__form header__form--pl">
        {editMode
          ? "Update Player"
          : "Add Player"
        }
      </h2>


      <div className="upload--img">
        <input type="file" name="file" placeholder="upload an image" onChange={uploadImage}/>
        {
          loading
          ?(
            <h3 className="h3 h3--img-load">Fetching..</h3>
          )
          :(
            <img src={image} className="img" style={{width: 300}} />
          )
        }
      </div>

        <div className="form-pl__group form-pl__group--name">
          <label htmlFor="name">
            Player name:
          </label>
          <input type="text" name="name" required autoFocus className="form-pl__ctrl form-pl__ctrl--name" placeholder="Name" defaultValue={player.name} onChange={handleControlledInputChange}
          />
        </div>

        <div className="form-pl__group form-pl__group--breed">
          <label htmlFor="breed">
            Player breed:
          </label>
          <input type="text" name="breed" required className="form-pl__ctrl form-pl__ctrl--breed" placeholder="Breed" defaultValue={player.breed} onChange={handleControlledInputChange}
          />
        </div>

        <div className="form-pl__group form-pl__group--age">
          <label htmlFor="age">
            Age:
          </label>
          <input type="text" name="age" required className="form-pl__ctrl form-pl__ctrl--age" placeholder="Player age" defaultValue={player.age} onChange={handleControlledInputChange}
          />
        </div>

        <div className="form-pl__group form-pl__group--number">
          <input type="text" name="number" required className="form-pl__ctrl form-pl__ctrl--number" placeholder="Player number" defaultValue={player.number} onChange={handleControlledInputChange}
          />
        </div>
        <button type="submit" className="btn btn__sbmt btn__sbmt--pl" onClick={e => {
          e.preventDefault()
          constructNewPlayer()
        }}>
          {editMode
            ? "Update"
            : "Submit"
          }
        </button>

        </section>
      </div>
  )
}