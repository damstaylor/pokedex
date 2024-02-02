import './App.scss';
import { Outlet } from 'react-router-dom';
import PokemonList from './components/PokemonList/PokemonList.tsx';

const App = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Pokédex</h1>
      </header>
      <main>
        <PokemonList />
      </main>
      <Outlet />
    </div>
  );
};

export default App;
