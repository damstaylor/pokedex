import './PokemonItem.css';

interface PokemonItemProps {
  name: string;
  imageUrl: string;
  number: number;
}

const PokemonItem: React.FC<PokemonItemProps> = ({
  name,
  imageUrl,
  number,
}) => (
  <li className="pokemon-item">
    <div className="pokemon-item__img">
      <img src={imageUrl} alt={name + '_image'} />
    </div>
    <div className="pokemon-item__info">
      <h5>{`#${number.toString().padStart(3, '0')}`}</h5>
      <h4>{name}</h4>
    </div>
  </li>
);

export default PokemonItem;
