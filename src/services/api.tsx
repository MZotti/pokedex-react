import axios from 'axios';

const defaultHeaders = {
  'Content-Type': 'application/json',
}

const API_INSTANCE = axios.create({
	headers: defaultHeaders,
	baseURL: "https://pokeapi.co/api/v2",
});

export const API = API_INSTANCE;