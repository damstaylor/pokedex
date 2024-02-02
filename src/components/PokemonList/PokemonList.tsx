import './PokemonList.scss';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '@/components/Spinner/Spinner.tsx';
import PokemonGrid from '../PokemonGrid/PokemonGrid';

const { VITE_BASE_URL, VITE_IMG_BASE_URL } = import.meta.env;

const PokemonList = () => {
  const [page, setPage] = useState(1);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const fetchPokemonData = async (page: number): Promise<Pokemon[]> => {
    const limit = 40;
    const offset = (page - 1) * limit;
    try {
      const response = await fetch(
        `${VITE_BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
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
    <div className="pokemon-list" id="scrollableDiv">
      <InfiniteScroll
        dataLength={pokemonList.length}
        next={loadMorePokemon}
        hasMore={true}
        loader={<Spinner />}
        endMessage={<p>No more Pokémon to load.</p>}
        scrollThreshold={1}
        // Necessary for triggering infinite scroll in component
        height={'calc(100lvh - 88px)'}
      >
        <PokemonGrid items={pokemonList} />
      </InfiniteScroll>
    </div>
  );
};

export default PokemonList;
