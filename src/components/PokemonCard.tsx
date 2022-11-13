import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'react-query'
import { firstLetterUperr } from '../functions/firstLetterUpper'
import { usePokemonSingle } from '../hooks/pokemon'
import { GET_POKEMON_SINGLE } from '../services/pokemon'
import types from '../variables/types'

type Props = {
  name: String
}

const PokemonCard = (props: Props) => {
  const [pokemon, setPokemon] = useState()
  const [isLoading, setIsLoading] = useState(true)

  React.useEffect(() => {
    const loadCard = async (name) => {
      const data = await GET_POKEMON_SINGLE(name)
      setPokemon(data);
      setIsLoading(false)
    }

    loadCard(props.name);
  }, [props])

  return (
    <div
      className="
        relative
        flex
        flex-col
        justify-center
        items-center
        h-[320px]
        rounded-[12px]
      "
    >
      {
        isLoading ?
        <></>
        :
        <>
          <div 
            className="
              absolute
              w-full
              h-full
              cursor-pointer
              z-50
              rounded-[12px]
              hover:bg-black
              transition-colors
              opacity-30
            "
          />
          <div className="
          w-full
          h-[160px]
          rounded-t-[12px]
        "
          style={{
            backgroundColor: types.find(tp => tp.id == pokemon.types[0].type.name)?.color
          }}
        />
        <div className="
          flex
          justify-center
          items-end
          w-full
          h-[160px]
          p-[12px]
          bg-white
          rounded-b-[12px]
        ">
          <div className="
            flex
            flex-col
            justify-center
            items-center
          ">
            {
              isLoading ?
              <></>
              :
              <>
                <span className="font-bold"># {pokemon?.id}</span>
                <span className="text-lg">{firstLetterUperr(pokemon?.name)}</span>
                <span>{pokemon?.types.map(tp => 
                  <>{`${firstLetterUperr(tp.type.name)} `}</>
                )}</span>
              </>
            }
          </div>
        </div>
        <div className="
          absolute
          w-[136px]
          h-[136px]
          rounded-full
          bg-white
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
      </>
      }
      
    </div>
  )
}

export default PokemonCard