import { Route, Routes as Switch } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
import PokemonList from './pages/PokemonList';

const Routes = () => {
  return (
    <Switch>
      <Route 
        path="/list"
        element={<PokemonList />}
      />
      <Route 
        path="/pokemon/:name"
        element={<PokemonDetails />}
      />
      <Route 
        path="/"
        element={<Home />}
      />
    </Switch>
  )
}

export default Routes