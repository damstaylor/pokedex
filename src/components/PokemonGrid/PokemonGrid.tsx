import './PokemonGrid.scss';
import { useNavigate, useParams } from 'react-router-dom';
import PokemonItem from '@/components/PokemonItem/PokemonItem.tsx';

interface PokemonGridProps {
  items: Pokemon[];
}

const PokemonGrid = ({ items }: PokemonGridProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const navigateTo = (newId: number | string) => {
    if (newId !== id) {
      navigate(`/pokemon/${newId}`);
    }
  };
  return (
    <div className="pokemon-grid">
      <ul className="pokemon-grid__content">
        {items.map((item) => (
          <PokemonItem
            key={`${item.name}-${item.number}`}
            name={item.name}
            imageUrl={item.imageUrl}
            number={item.number}
            selected={item.number.toString() === id}
            handleClick={() => navigateTo(item.number)}
          />
        ))}
      </ul>
    </div>
  );
};

export default PokemonGrid;
