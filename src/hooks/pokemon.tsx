import { useState, createContext, useContext, useReducer, Dispatch } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'

import { GET_POKEMON_LIST, GET_POKEMON_SINGLE } from '../services/pokemon'

const ACTION_TYPES = {
	LIST: 'LIST_POKEMON',
	VIEW: 'VIEW_POKEMON',
}

const pokemonReducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.LIST: {
			console.log('entrou list')
			return { 
				...state, 
				pokemonList: action.data
			}
		}
		case ACTION_TYPES.VIEW: {
			console.log('entrou view')
			return { 
				...state, 
				pokemon: action.data
			}
		}
		default: {
			return state
		}
	}
}

interface Actions {
	type: string;
	value: any;
}

interface InitContextProps {
  state: any;
  dispatch: Dispatch<Actions>;
}

type Props = {
	children: JSX.Element,
}

const PokemonStateContext = createContext({} as InitContextProps);
const PokemonDispatchContext = createContext({} as InitContextProps);


const PokemonProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(pokemonReducer, { pokemonList: [], pokemon: {} })
		const [page, setPage] = useState(24);
		const value = { state, dispatch };
  
    return (
			<PokemonStateContext.Provider value={{ ...state, page, setPage }}>
					<PokemonDispatchContext.Provider value={value}>{children}</PokemonDispatchContext.Provider>
			</PokemonStateContext.Provider>
    )
}

const usePokemon = () => {
	const context = useContext(PokemonStateContext)

	if (!context)
		throw new Error('usePokemon must be used within an PokemonProvider')

	return context
}
  
const useDispatch = () => {
	const { dispatch } = useContext(PokemonDispatchContext)

	if (dispatch === undefined)
			throw new Error('useDispatch must be used within a PokemonProvider')

	return dispatch
}

const usePokemonList = () => {
	const dispatch = useDispatch()

	return useInfiniteQuery('pokemonList', (pageParam) => GET_POKEMON_LIST(pageParam), {
			getNextPageParam: (offset) => offset,
			onSuccess: ({pages}) => {
				let data = []
				pages.map(el => data = [...data, ...el])
				dispatch({ type: ACTION_TYPES.LIST, data })
			},
	})
}

const usePokemonSingle = (name) => {
	const dispatch = useDispatch()

	return useQuery('pokemon', () => GET_POKEMON_SINGLE(name), {
			onSuccess: (data) => {
				console.log('GET_POKEMON_SINGLE', name, data)
				dispatch({ type: ACTION_TYPES.VIEW, data })
			},
	})
}

export {
	PokemonProvider,
	usePokemon,
  usePokemonList,
  usePokemonSingle
}
  