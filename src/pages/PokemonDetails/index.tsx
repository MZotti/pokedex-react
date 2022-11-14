import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { firstLetterUpper } from '../../functions/firstLetterUpper'
import { usePokemon, usePokemonSingle } from '../../hooks/pokemon'
import types from '../../variables/types'
import PokemonMoves from './PokemonMoves'
import PokemonStats from './PokemonStats'

const PokemonDetails = () => {
  const { name } = useParams()
  const { pokemon } = usePokemon()
  const { isLoading } = usePokemonSingle(name)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if(isLoading)
    return <div></div>

  return (
    <div
      className="
        relative
        w-full
        max-w-[1000px]
        px-auto
      "
    >
      <div className="
        absolute
        flex
        justify-center
        items-center
        w-[80px]
        h-[40px]
        rounded-full
        bg-white
        top-[10px]
        right-[10px]
        cursor-pointer
      "
      >
        <Link to="../list">
          Back
        </Link>
      </div>
      <div className="
        absolute
        w-[144px]
        h-[144px]
        rounded-full
        bg-white
        top-[80px]
        left-[40px]
        z-40
      "
      >
        <img
          className="
            w-full
          "
          src={pokemon?.sprites.front_default}
        />
      </div>  
      <div
        className="
          w-full
          h-[148px]
          rounded-t-[12px]
        "
        style={{
          backgroundColor: types.find(tp => tp.id == pokemon.types[0].type.name)?.color
        }}
      />
      <div
        className="
          w-full
          min-h-[148px]
          rounded-b-[12px]
          bg-white
        "
      >
        <div
          className="
            w-full
            pt-20
            pb-8
            px-12
          "
        >
          <div
            className="
              w-full
              flex
              items-baseline
              pb-4
            "
          >
            <span className='text-2xl mr-4'>{firstLetterUpper(pokemon.name)} </span>
            <span className='text-lg'>{pokemon.types.map(tp => `${firstLetterUpper(tp.type.name)} `)}</span>
          </div>
          <div
            className="
              w-full
              flex
              justify-between
            "
          >
            <PokemonStats stats={pokemon.stats} />
            <PokemonMoves moves={pokemon.moves} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails