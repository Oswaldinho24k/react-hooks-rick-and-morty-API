import React, { useState, useEffect } from 'react'
import Card from './Card'
import axios from 'axios'
import { getImages, saveImage, uploadImage } from './services/firebase'
import CharForm from './CharForm'

function App() {

  const [characters, setCharacters] = useState([])
  const [info, setInfo] = useState({})
  let [char, setChar] = useState({})



  useEffect(() => {
    //getData()
    getFromFirebase()
  }, [])

  function getFromFirebase() {
    getImages()
      .then(images => {
        console.log(images)
        setCharacters(images)
      })
  }

  function getData(url = "https://rickandmortyapi.com/api/character") {
    axios.get(url)
      .then(response => {
        console.log(response)
        setCharacters(response.data.results)
        setInfo(response.data.info)
      }).catch(e => {
        console.log(e)
      })
  }

  function handleChange(e) {
    let c = { ...char }
    c[e.target.name] = e.target.value
    setChar(c)
    //console.log("todo bien? ha? ", char)
  }

  function handleClick() {
    saveImage(char)
    let chars = [...characters]
    chars.unshift(char)
    setCharacters(chars)
  }

  function handleFile(e) {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      let lupe = { ...char }
      lupe.image = reader.result
      setChar(lupe)
    }
    // uploadImage(e.target.files[0])
    //   .then(link => {
    //     let lupe = { ...char }
    //     lupe.image = link
    //     setChar(lupe)
    //   })
  }


  return (
    <div>
      <h1>Ricymorty</h1>

      <CharForm link={char.image} handleFile={handleFile} onClick={handleClick} onChange={handleChange} />

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {characters.map((char, key) => (
          <Card key={key} {...char} />
        ))}
      </div>

      <button disabled={info.prev ? false : true} onClick={() => getData(info.prev)}>Previous </button> |{info.count} items| <button disabled={info.next ? false : true} onClick={() => getData(info.next)}>Next </button>
    </div>
  )
}

export default App