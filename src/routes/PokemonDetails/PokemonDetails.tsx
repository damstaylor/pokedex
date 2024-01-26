import './PokemonDetails.scss';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<any>(null);
  const [speciesDetails, setSpeciesDetails] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(true);
  const navigate = useNavigate();
  const { VITE_BASE_URL } = import.meta.env;

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`${VITE_BASE_URL}/pokemon/${id}`);
        const data = await response.json();
        console.log(data)
        setDetails(data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };
    const fetchPokemonSpeciesDetails = async () => {
      try {
        const response = await fetch(`${VITE_BASE_URL}/pokemon-species/${id}`);
        const data = await response.json();
        console.log(data)
        setSpeciesDetails(data);
      } catch (error) {
        console.error('Error fetching Pokemon species details:', error);
      }
    };
    fetchPokemonDetails();
    fetchPokemonSpeciesDetails();
  }, [id]);

  const closeModal = () => {
    setModalOpen(false);
    navigate('/');
  };
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeModal();
  };
  const handleOutsideClick = () => {
    closeModal();
  };

  const imageUrl: string = details?.sprites?.other?.home.front_default || '';
  return (
    <div className={`pokemon-details ${isModalOpen ? 'open' : 'closed'}`} onClick={handleOutsideClick}>
      {details && imageUrl ? (
        <div className="pokemon-details__content" onClick={handleModalClick}>
          <button className="close-button" onClick={closeModal}>
            ×
          </button>
          <h2>#{id} {sentenceCase(details.name)}</h2>
          <img src={imageUrl} alt={details.name} />
          <h3>Types: {details.types.map((t: { type: { name: string; }; }) => t.type.name).join(', ')}</h3>
        </div>
      ) : <Spinner />}
    </div>
  );
};

export default PokemonDetails;
