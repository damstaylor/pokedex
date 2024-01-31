import './PokemonDetails.scss';
import { capitalCase } from 'change-case';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchData from '@/services/fetchData.ts';
import formatNumber from '@/utils/utils.ts';
import ImageSlider from '@/components/ImageSlider/ImageSlider.tsx';
import SpeciesDetails from '@/components/SpeciesDetails/SpeciesDetails.tsx';
import Spinner from '@/components/Spinner/Spinner.tsx';
import Stats from '@/components/Stats/Stats.tsx';
import TypePill from '@/components/TypePill/TypePill.tsx';

type ImageVariantsItem = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);
  const navigate = useNavigate();
  const ID_NUM_MIN = 1;
  const ID_NUM_MAX = 1025;
  const ID_SPE_MIN = 10001;
  const ID_SPE_MAX = 10277;
  const [details, setDetails] = useState<any>(null);
  const [speciesDetails, setSpeciesDetails] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(true);
  const spritesObject = details ? details.sprites : null;
  const otherImagesObjects: ImageVariantsItem[] = spritesObject && spritesObject.other ? Object.values(spritesObject.other) : [];
  const imageUrls: string[] = otherImagesObjects.map((o) => o.front_default).filter(x => !!x);
  const stats = details ? details.stats.map((stat: any) => ({ label: capitalCase(stat.stat.name), value: stat.base_stat })) : [];

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
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        navigateToPrevious();
        break;
      case 'ArrowRight':
        navigateToNext();
        break;
      default:
        break;
    }
  };
  const navigateToPrevious = () => {
    let newId;
    if (numId === ID_NUM_MIN) {
      newId = ID_SPE_MAX;
    } else if (numId === ID_SPE_MIN) {
      newId = ID_NUM_MAX;
    } else {
      newId = numId - 1;
    }
    navigate(`/pokemon/${newId}`);
  };
  const navigateToNext = () => {
    let newId;
    if (numId === ID_NUM_MAX) {
      newId = ID_SPE_MIN;
    } else if (numId === ID_SPE_MAX) {
      newId = ID_NUM_MIN;
    } else {
      newId = numId + 1;
    }
    navigate(`/pokemon/${newId}`);
  };
  useEffect(() => {
    if (id !== undefined) {
      fetchAllPokemonData(id);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [id]);
  return (
    <div className={`pokemon-details ${isModalOpen ? 'open' : 'closed'}`} onClick={handleOutsideClick}>
      <div className="pokemon-details__container">
        <a className="close-button" onClick={closeModal}>×</a>
        <div className="pokemon-details__content" onClick={handleModalClick}>
          {details ? (
            <>
              <h2>{id && formatNumber(id)} {capitalCase(details.name)}</h2>
              <div className="pokemon-details__data-container">
                <a className="arrow" onClick={navigateToPrevious}>
                  <FontAwesomeIcon icon="angle-left" />
                </a>
                <div className="pokemon-details__data">
                  <ImageSlider images={imageUrls} />
                  <div className="pokemon-details__types">
                    {details.types.map((t: { type: { name: string; }; }) => (
                      <TypePill text={t.type.name} key={t.type.name} />
                    ))}
                  </div>
                  <div className="pokemon-details__more-info section">
                    {speciesDetails && <div className="pokemon-details__species-details section">
                      <SpeciesDetails
                        details={details}
                        speciesDetails={speciesDetails}
                      />
                    </div>}
                  </div>
                  <div className="pokemon-details__stats-container section">
                    <Stats stats={stats} />
                  </div>
                </div>
                <a className="arrow" onClick={navigateToNext}>
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
