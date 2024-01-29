import './PokemonDetails.scss';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../../components/Spinner/Spinner';

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ID_NUM_MAX = 1302;
  const [details, setDetails] = useState<any>(null);
  const [speciesDetails, setSpeciesDetails] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(true);
  const { VITE_BASE_URL } = import.meta.env;

  const fetchPokemonDetails = async (pokemonId: string) => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/pokemon/${pokemonId}`);
      const data = await response.json();
      console.log(data);
      setDetails(data);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };
  const fetchPokemonSpeciesDetails = async (pokemonId: string) => {
    try {
      const response = await fetch(`${VITE_BASE_URL}/pokemon-species/${pokemonId}`);
      const data = await response.json();
      console.log(data);
      setSpeciesDetails(data);
    } catch (error) {
      console.error('Error fetching Pokemon species details:', error);
    }
  };
  const fetchAllPokemonData = (pokemonId: string) => {
    fetchPokemonDetails(pokemonId);
    fetchPokemonSpeciesDetails(pokemonId);
  };

  useEffect(() => {
    if (id !== undefined) {
      fetchAllPokemonData(id);
    }
  }, [id]);

  const closeModal = () => {
    setModalOpen(false);
    navigate('/');
  };
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const handleOutsideClick = () => {
    closeModal();
  };
  const onPrevious = () => {
    if (Number(id) === 1) {
      return;
    }
    navigate(`/pokemon/${Number(id) - 1}`);
  };
  const onNext = () => {
    if (Number(id) === ID_NUM_MAX) {
      return;
    }
    navigate(`/pokemon/${Number(id) + 1}`);
  };

  const imageUrl: string = details?.sprites?.other?.home.front_default || '';
  return (
    <div className={`pokemon-details ${isModalOpen ? 'open' : 'closed'}`} onClick={handleOutsideClick}>
      {details && imageUrl ? (
        <div className="pokemon-details__container">
          <button className="close-button" onClick={closeModal}>
            ×
          </button>
          <div className="pokemon-details__content" onClick={handleModalClick}>
            <div>
              <h2>#{id} {sentenceCase(details.name)}</h2>
              <div className="pokemon-details__image-container">
                <a className={Number(id) === 1 ? 'disabled' : ''} onClick={Number(id) !== 1 ? onPrevious : undefined}>
                  <FontAwesomeIcon icon="angle-left" style={{ fontSize: '48px' }} />
                </a>
                <img src={imageUrl} alt={details.name} />
                <a className={Number(id) === ID_NUM_MAX ? 'disabled' : ''} onClick={onNext}>
                  <FontAwesomeIcon icon="angle-right" style={{ fontSize: '48px' }} />
                </a>
              </div>
              <h3>Types: {details.types.map((t: { type: { name: string; }; }) => t.type.name).join(', ')}</h3>
            </div>
          </div>
        </div>
      ) : <Spinner />}
    </div>
  );
};

export default PokemonDetails;
