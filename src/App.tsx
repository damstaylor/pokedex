import './App.scss';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import PokemonList from './components/PokemonList/PokemonList.tsx';
import Header from './components/Header/Header.tsx';

function App(): JSX.Element {
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const handleScroll = (e: Event) => {
    const scrollTop = e?.target?.scrollTop;
    const newIsScrollingDown = scrollTop > previousScrollPosition;
    setIsScrollingDown(newIsScrollingDown);
    setPreviousScrollPosition(scrollTop);
  };
  return (
    <div className="app-container">
      <Header hidden={isScrollingDown}>
        <h1>Pokédex</h1>
      </Header>
      <main>
        <PokemonList handleScroll={handleScroll} />
      </main>
      <Outlet />
    </div>
  );
}

export default App;
