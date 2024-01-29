import './PokemonDetails.scss';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '@/components/Spinner/Spinner';

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ID_NUM_MIN = 1;
  const ID_NUM_MAX = 1025;
  const ID_SPE_MIN = 10001;
  const ID_SPE_MAX = 10277;
  const [details, setDetails] = useState<any>(null);
  const [speciesDetails, setSpeciesDetails] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(true);
  const imageUrl: string = details?.sprites?.other?.home.front_default || '';
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
      navigate(`/pokemon/${ID_SPE_MAX}`);
      return;
    }
    if (Number(id) === ID_SPE_MIN) {
      navigate(`/pokemon/${ID_NUM_MAX}`);
      return;
    }
    navigate(`/pokemon/${Number(id) - 1}`);
  };
  const onNext = () => {
    if (Number(id) === ID_NUM_MAX) {
      navigate(`/pokemon/${ID_SPE_MIN}`);
      return;
    }
    if (Number(id) === ID_SPE_MAX) {
      navigate(`/pokemon/${ID_NUM_MIN}`);
      return;
    }
    navigate(`/pokemon/${Number(id) + 1}`);
  };

  return (
    <div className={`pokemon-details ${isModalOpen ? 'open' : 'closed'}`} onClick={handleOutsideClick}>
      <div className="pokemon-details__container">
        <a className="close-button" onClick={closeModal}>×</a>
        <div className="pokemon-details__content" onClick={handleModalClick}>
          {details ? (
            <>
              <h2>#{id} {sentenceCase(details.name)}</h2>
              <div className="pokemon-details__image-container">
                <a className="arrow" onClick={onPrevious}>
                  <FontAwesomeIcon icon="angle-left" />
                </a>
                <img src={imageUrl || 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c329.png'} alt={details.name} />
                <a className="arrow" onClick={onNext}>
                  <FontAwesomeIcon icon="angle-right" />
                </a>
              </div>
            </>
          ) : <Spinner />}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
