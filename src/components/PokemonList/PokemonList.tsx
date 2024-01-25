import { useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
import InfiniteScroll from 'react-infinite-scroll-component';
import './PokemonList.scss';
import Pokemon from '@/interfaces/Pokemon.ts';
import PokemonItem from '@/components/PokemonItem/PokemonItem.tsx';

type PokemonApiItem = { name: string; url: string; };

const { VITE_BASE_URL, VITE_IMG_BASE_URL } = import.meta.env;

const PokemonList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const fetchPokemonData = async (page: number): Promise<Pokemon[]> => {
    const limit = 40;
    const offset = (page - 1) * limit;
    try {
      const response = await fetch(`${VITE_BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      const newItemList = data.results.map((item: PokemonApiItem, index: number) => ({
        name: item.name,
        imageUrl: `${VITE_IMG_BASE_URL}/${offset + index + 1}.png`,
        number: offset + index + 1,
      }));
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
        loader={<>
        <p>Loading...</p></>}
        endMessage={<p>No more Pokémon to load.</p>}
        height={'calc(100lvh - 88px)'}
      >
        <ul className="pokemon-list__container">
          {pokemonList.map(pokemon => (
            <PokemonItem
              key={`${pokemon.name}-${pokemon.number}`}
              name={sentenceCase(pokemon.name)}
              imageUrl={pokemon.imageUrl}
              number={pokemon.number}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default PokemonList;
