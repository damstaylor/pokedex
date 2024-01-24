import { useState, useEffect } from 'react';
import './PokemonList.scss';
import Pokemon from '../../interfaces/Pokemon.ts';
import PokemonItem from '../../components/PokemonItem/PokemonItem.tsx';
import { sentenceCase } from 'change-case';

type PokemonApiItem = { name: string; url: string };

const { VITE_BASE_URL, VITE_IMG_BASE_URL } = import.meta.env;

const fetchPokemonData = async (): Promise<Pokemon[]> => {
  try {
    const response = await fetch(`${VITE_BASE_URL}/pokemon?limit=151&language=fr`);
    const data = await response.json();
    return data.results.map((item: PokemonApiItem, index: number) => ({
      name: item.name,
      imageUrl: `${VITE_IMG_BASE_URL}/${index + 1}.png`,
      number: index + 1,
    })) as Pokemon[];
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return [];
  }
};

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const updatedPokemonList = await fetchPokemonData();
      setPokemonList(updatedPokemonList);
    };
    fetchData();
  }, []);

  return (
    <div className="pokemon-list">
      <ul className="pokemon-list__container">
        {pokemonList.map((pokemon) => (
          <PokemonItem
            key={pokemon.name}
            name={sentenceCase(pokemon.name)}
            imageUrl={pokemon.imageUrl}
            number={pokemon.number}
          />
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
