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
    <div className="pokemon-item__frame">
      <h5>{`#${number.toString().padStart(3, '0')}`}</h5>
      <h4>{name}</h4>
      <img src={imageUrl} alt={name + '_image'} />
    </div>
  </li>
);

export default PokemonItem;
