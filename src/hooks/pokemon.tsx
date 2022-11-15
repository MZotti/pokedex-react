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
			return { 
				...state, 
				pokemonList: [...state.pokemonList, ...action.data]
			}
		}
		case ACTION_TYPES.VIEW: {
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
	pokemonList: Array<Object>
	pokemon: Object
	page: number
	setPage: Function
  dispatch: Dispatch<Actions>;
}

type Props = {
	children: JSX.Element,
}

const PokemonStateContext = createContext({} as InitContextProps);
const PokemonDispatchContext = createContext({} as InitContextProps);


const PokemonProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(pokemonReducer, { pokemonList: [], pokemon: {} })
		const [page, setPage] = useState(0);
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
	const { page, setPage } = usePokemon()

	return useInfiniteQuery('pokemonList', () =>  GET_POKEMON_LIST(page), {
			getNextPageParam: (offset) => offset,
			onSuccess: ({pages}) => {
				let data = pages.slice(-1);
				data = [...data[0]]
				setPage(page + 24)
				dispatch({ type: ACTION_TYPES.LIST, data })
			},
	})
}

const usePokemonSingle = (name) => {
	const dispatch = useDispatch()

	return useQuery('pokemon', () => GET_POKEMON_SINGLE(name), {
			onSuccess: (data) => {
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
  