import './PokemonDetails.scss';
import { capitalCase } from 'change-case';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchData from '@/services/fetchData.ts';
import TypePill from '@/components/TypePill/TypePill.tsx';
import Spinner from '@/components/Spinner/Spinner.tsx';
import ImageSlider from '@/components/ImageSlider/ImageSlider';

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
  const defaultImageUrl = 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c329.png';
  const imageUrls: string[] = details && Object.values(details?.sprites?.other).map(o => o.front_default).filter(x => !!x) || [];

  const fetchPokemonDetails = async (pokemonId: string) => {
    const results = await fetchData(`pokemon/${pokemonId}`);
    if (results !== undefined) {
      setDetails(results);
    }
  };
  const fetchPokemonSpeciesDetails = async (pokemonId: string) => {
    const results = await fetchData(`pokemon-species/${pokemonId}`);
    if (results !== undefined) {
      setSpeciesDetails(results);
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
              <h2>#{id} {capitalCase(details.name)}</h2>
              <div className="pokemon-details__image-container">
                <a className="arrow" onClick={onPrevious}>
                  <FontAwesomeIcon icon="angle-left" />
                </a>
                <div className="pokemon-details__data">
                  <ImageSlider images={imageUrls} />
                  <div className="pokemon-details__types">
                    {details.types.map((t: { type: { name: string; }; }) => (
                      <TypePill text={t.type.name} key={t.type.name} />
                      ))}
                  </div>
                </div>
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
