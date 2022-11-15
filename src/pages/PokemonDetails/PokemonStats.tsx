type Props = {
  stats: Array<Stat>
}

type Stat = {
  base_stat: Number
  stat: Object
}

const PokemonStats = ({stats}: Props) => {
  return (
    <div className="
      w-full
    ">
      <h2 className="text-xl mb-2">Stats:</h2>
      <div
        className="
          w-full
          grid
          grid-rows-1
          grid-cols-1
          gap-2
        "
      >
      {
        stats.map(st => <span className='text-lg mr-2'>{st.stat.name.replace('-', ' ').toUpperCase()}: {st.base_stat}</span>)
      }
      </div>
    </div>
  )
}

export default PokemonStats