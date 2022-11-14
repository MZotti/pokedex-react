import React from 'react'
import { Link } from 'react-router-dom'
import PokemonCaroussel from '../components/PokemonCaroussel'

const Home = () => {
  return (
    <div
      className="
        w-full
        flex
        flex-col
        justify-center
        items-center
        p-8
        gap-4
      "
    >
      <PokemonCaroussel />
      <p>A small project based on the Pokemon series pokedex using <a className='hover:text-red-600' href="https://pokeapi.co" target="_blank">PokeApi</a>.</p>
      <p>This project is made with: Typescript, React, Vite.js and Tailwind CSS.</p>
      <p><Link className='hover:text-red-600' to="/list">Click here to access the full Pokedex.</Link></p>
    </div>
  )
}

export default Home