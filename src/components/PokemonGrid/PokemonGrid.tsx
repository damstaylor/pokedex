import './PokemonGrid.scss';
import PokemonItem from '@/components/PokemonItem/PokemonItem.tsx';

interface PokemonGridProps {
  items: Pokemon[];
};

const PokemonGrid: React.FC<PokemonGridProps> = ({ items }) => {
  return (
    <div className="pokemon-grid">
      <ul className="pokemon-grid__content">
        {items.map((item) => (
          <PokemonItem
            key={`${item.name}-${item.number}`}
            name={item.name}
            imageUrl={item.imageUrl}
            number={item.number}
          />
        ))}
      </ul>
    </div>
  );
};

export default PokemonGrid;
