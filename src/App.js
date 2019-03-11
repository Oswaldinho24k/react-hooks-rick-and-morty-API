import React, {useState, useEffect} from 'react'
import Card from './Card'
import axios from 'axios'

function App(){

  const [characters, setCharacters] = useState([])
  const [info, setInfo] = useState({})

  

  useEffect(()=>{
    getData()
  },[])

  function getData(url="https://rickandmortyapi.com/api/character"){
    axios.get(url)
    .then(response=>{
      console.log(response)      
      setCharacters(response.data.results)
      setInfo(response.data.info)
    }).catch(e=>{
      console.log(e)
    })
  }


  return(
    <div>
      <h1>Ricymorty</h1>
      
      <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-around'}}>
      {characters.map((char, key)=>(
        <Card key={key} {...char}/>
      ))}
      </div>

      <button disabled={info.prev?false:true} onClick={()=>getData(info.prev)}>Previous </button> |{info.count} items| <button disabled={info.next?false:true} onClick={()=>getData(info.next)}>Next </button>
    </div>
  )
}

export default App