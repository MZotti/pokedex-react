import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import './assets/styles/global.css'
import PokemonProvider from './providers/pokemonProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PokemonProvider>
    <App />
  </PokemonProvider>
)
