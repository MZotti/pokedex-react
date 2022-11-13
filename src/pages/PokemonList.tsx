import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import PokemonCard from '../components/PokemonCard'
import { usePokemon, usePokemonList } from '../hooks/pokemon'

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(24);
  const { pokemonList } = usePokemon()
  const { isLoading, fetchNextPage } = usePokemonList()

  const handleNextPage = () => {
    setCurrentPage(currentPage + 24)
    fetchNextPage({ pageParam: currentPage })
  }

  return (
    <InfiniteScroll
      style={{
        width: "100%"
      }}
      dataLength={pokemonList.length} //This is important field to render the next data
      next={handleNextPage}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Fim</b>
        </p>
      }
    >
      <div
        className="
          w-full
          flex
          justify-center
        "
      >
        <div
          className="
            w-full
            max-w-[1000px]
            mx-auto
            grid
            grid-cols-3
            grid-rows-1
            gap-8
          "
        >
          
            {pokemonList.map(e =>
              <PokemonCard 
                name={e.name}
              />
            )}
        </div>
      </div>
    </InfiniteScroll>
  )
}

export default PokemonList