import './App.scss';
import PokemonList from './components/PokemonList/PokemonList.tsx';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Pokédex</h1>
      </header>
      <main>
        <PokemonList />
      </main>
    </div>
  );
};

export default App;
