import './PokemonItem.scss';
import formatNumber from '@/utils/utils.ts';
import { capitalCase } from 'change-case';

interface PokemonItemProps {
  name: string;
  imageUrl: string;
  number: number;
  selected?: boolean;
  handleClick: Function;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ name, imageUrl, number, selected = false, handleClick }) => {
  const onClick = () => {
    if (selected) {
      return;
    }
    handleClick();
  };
  return (
    <li className={`pokemon-item ${selected ? 'selected' : ''}`}>
      <a onClick={onClick}>
        <div className="pokemon-item__img">
          <img src={imageUrl} alt={name + '_image'} />
        </div>
        <div className="pokemon-item__info">
          <h5>{formatNumber(number)}</h5>
          <h4 className="text-overflow-ellipsis">{capitalCase(name)}</h4>
        </div>
      </a>
    </li>
  );
};

export default PokemonItem;
