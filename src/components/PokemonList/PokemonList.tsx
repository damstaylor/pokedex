import './PokemonList.scss';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '@/components/Spinner/Spinner.tsx';
import PokemonGrid from '../PokemonGrid/PokemonGrid';

const { VITE_BASE_URL, VITE_IMG_BASE_URL } = import.meta.env;

interface PokemonListProps {
  handleScroll: Function;
}

const PokemonList = ({ handleScroll }: PokemonListProps) => {
  const [page, setPage] = useState(1);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [count, setCount] = useState(0);
  const headerHeight = document.getElementById('header')?.offsetHeight;
  const limit = 100;
  const fetchPokemonData = async (page: number): Promise<Pokemon[]> => {
    const offset = (page - 1) * limit;
    try {
      const response = await fetch(
        `${VITE_BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      setCount(data.count);
      const newItemList = data.results.map(
        (item: APIBaseItem, index: number) => ({
          name: item.name,
          imageUrl: `${VITE_IMG_BASE_URL}/${offset + index + 1}.png`,
          number: offset + index + 1,
        })
      );
      return newItemList as Pokemon[];
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      return [];
    }
  };
  const loadMorePokemon = async () => {
    const newPokemonList = await fetchPokemonData(page + 1);
    setPokemonList((prevList) => [...prevList, ...newPokemonList]);
    setPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    const fetchInitialPokemonData = async () => {
      const newPokemonList = await fetchPokemonData(page);
      setPokemonList(newPokemonList);
    };
    fetchInitialPokemonData();
  }, []);
  return (
    <div className="pokemon-list">
      <InfiniteScroll
        dataLength={pokemonList.length}
        next={loadMorePokemon}
        hasMore={pokemonList.length < count}
        loader={<Spinner />}
        endMessage={<p>No more Pokémon to load.</p>}
        scrollThreshold={1}
        onScroll={(e: Event) => handleScroll(e)}
        // Necessary for triggering infinite scroll in component
        height={'100lvh'}
      >
        <div style={{paddingTop: headerHeight}}>
          <PokemonGrid items={pokemonList} />
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PokemonList;
