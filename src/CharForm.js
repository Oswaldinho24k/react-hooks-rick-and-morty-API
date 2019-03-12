import React from 'react'

export default function ({ link, onClick, onChange, handleFile }) {

    return (
        <div>
            <p>
                Nombre de tu personaje
                <input onChange={onChange} name="name" type="text" />
            </p>
            <p>
                Link de tu personaje
                <input onChange={handleFile} name="image" type="file" />
            </p>
            <img src={link} />
            <button onClick={onClick}>Subir</button>
        </div>
    )
}