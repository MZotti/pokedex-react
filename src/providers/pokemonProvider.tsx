
import { PokemonProvider as Provider } from '../hooks/pokemon'
import { QueryProvider } from './queryClient'

type Props = {
	children: JSX.Element,
}

const PokemonProvider = ({ children }: Props) => {
  return (
    <QueryProvider>
      <Provider>{children}</Provider>
    </QueryProvider>
  )
}

export default PokemonProvider
