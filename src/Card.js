import React from 'react'


function Card({name, id, image}){
    return(
        <div>
            <p>{name}</p>
            <img src={image} alt={name}/>
        </div>
    )
}

export default Card