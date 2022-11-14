import { API } from './api'

const POKEMON_ROUTE = '/pokemon';
const TYPES_ROUTE = '/type';

export const GET_POKEMON_LIST = async ({pageParam = 0}) => {
  const { data } = await API.get(`${POKEMON_ROUTE}/?offset=${pageParam}&limit=${24}`);

  return data.results
}

export const GET_POKEMON_SINGLE = async (pokemon = null) => {
  const { data } = await API.get(`${POKEMON_ROUTE}/${pokemon}`)

  return data
}

export const GET_TYPES = async () => {
  const { data } = await API.get(`${TYPES_ROUTE}`);

  return data
}

export const GET_TYPE = async (id = null) => {
  const { data } = await API.get(`${TYPES_ROUTE}/${id}`);

  return data
}