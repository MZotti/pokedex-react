import React from 'react'
import PokemonChange from './PokemonChange'

const PokemonCaroussel = () => {
  return (
    <div className="
      w-full
      flex
      justify-center
      gap-[100px]
    "
    >
      <PokemonChange />
      <PokemonChange />
      <PokemonChange />
    </div>
  )
}

export default PokemonCaroussel