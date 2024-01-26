import './PokemonItem.scss';
import { Link } from 'react-router-dom';

interface PokemonItemProps {
  name: string;
  imageUrl: string;
  number: number;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ name, imageUrl, number }) => {
  const formattedNumber = `#${number.toString().padStart(3, '0')}`;
  return (
    <Link to={`pokemon/${number}`}>
      <li className="pokemon-item">
        <div className="pokemon-item__img">
          <img src={imageUrl} alt={name + '_image'} />
        </div>
        <div className="pokemon-item__info">
          <h5>{formattedNumber}</h5>
          <h4 className="text-overflow-ellipsis">{name}</h4>
        </div>
      </li>
    </Link>
  );
};

export default PokemonItem;
