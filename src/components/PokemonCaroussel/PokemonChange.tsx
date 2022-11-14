import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GET_POKEMON_SINGLE } from '../../services/pokemon'

const PokemonChange = () => {
  const [pokemon, setPokemon] = useState(null)

  const loadPokemon = async () => {
    const id = Math.floor(Math.random() * (905 - 1) + 1)
    const data = await GET_POKEMON_SINGLE(id)
    setPokemon(data)
    setTimeout(() => {
      loadPokemon()
    }, 3000)
  }

  useEffect(() => {
    loadPokemon()
  }, [])

  return (
    <div className="
      flex
      justify-center
      items-center
      w-[160px]
      h-[160px]
    ">
      {
        pokemon && <Link className="w-full" to={`pokemon/${pokemon.id}`}><img className="w-full" src={pokemon.sprites.front_default} /></Link>
      }
    </div>
  )
}

export default PokemonChange