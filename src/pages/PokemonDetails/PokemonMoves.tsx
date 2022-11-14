import { firstLetterUpper } from "../../functions/firstLetterUpper";

const clearName = (name) => {
  return firstLetterUpper(name.replace('-', ' '));
}

const PokemonMoves = ({moves}) => {
  const moveArr = [...moves];

  return (
    <div className="
      w-full
    ">
      <h2 className="text-xl mb-2">Moves:</h2>
      <div
        className="
          w-full
          grid
          grid-rows-1
          grid-cols-2
          gap-2
        "
      >
        {
          moveArr.sort((a, b) => { return a.move.name > b.move.name ? 1 : -1}).map(mv => <span className='text-lg mr-2'>{clearName(mv.move.name)}</span>)
        }
      </div>
    </div>
  )
}

export default PokemonMoves