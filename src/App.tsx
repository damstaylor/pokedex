import './App.scss';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import PokemonList from './components/PokemonList/PokemonList.tsx';
import Header from './components/Header/Header.tsx';

function App(): JSX.Element {
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const handleScroll = (e: Event) => {
    const scrollTop = (e.target as HTMLElement).scrollTop;
    const newIsScrollingDown = scrollTop > previousScrollPosition;
    setIsScrollingDown(newIsScrollingDown);
    setPreviousScrollPosition(scrollTop);
  };
  return (
    <div className="app-container">
      <Header hidden={isScrollingDown}>
        <div className="header-content">
          <img alt="Pokéball" src="/pokeball.png" className="pokeball-icon" />
          <h1>Pokédex</h1>
        </div>
      </Header>
      <main>
        <PokemonList handleScroll={handleScroll} />
      </main>
      <Outlet />
    </div>
  );
}

export default App;
