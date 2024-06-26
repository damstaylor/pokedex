import './PokemonDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalCase } from 'change-case';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchData from '@/services/fetchData.ts';
import { formatNumber, getIdFromUrl } from '@/utils/utils.ts';
import ImageSlider from '@/components/ImageSlider/ImageSlider.tsx';
import PokemonGrid from '@/components/PokemonGrid/PokemonGrid.tsx';
import SpeciesDetails from '@/components/SpeciesDetails/SpeciesDetails.tsx';
import Spinner from '@/components/Spinner/Spinner.tsx';
import Stats from '@/components/Stats/Stats.tsx';
import TypePill from '@/components/TypePill/TypePill.tsx';

const PokemonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);
  const navigate = useNavigate();
  const containerControls = useAnimation();
  const backdropControls = useAnimation();
  const ID_NUM_MIN = 1;
  const ID_NUM_MAX = 1025;
  const ID_SPE_MIN = 10001;
  const ID_SPE_MAX = 10277;
  const [details, setDetails] = useState<any>(null);
  const [speciesDetails, setSpeciesDetails] = useState<any>(null);
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const pokemonName = details ? capitalCase(details.name) : '';
  const spritesObject = details ? details.sprites : null;
  const otherImagesObjects: ImageVariantsItem[] =
    spritesObject && spritesObject.other
      ? Object.values(spritesObject.other)
      : [];
  const imageUrls: string[] = otherImagesObjects
    .map((o) => o.front_default)
    .filter((x) => !!x);
  const stats = details
    ? details.stats.map((stat: any) => ({
        label: capitalCase(stat.stat.name),
        value: stat.base_stat,
      }))
    : [];

  const fetchPokemonDetails = async (pokemonId: string) => {
    const results = await fetchData(`pokemon/${pokemonId}`);
    if (results !== undefined) {
      console.log(results);
      setDetails(results);
    }
  };
  const fetchPokemonSpeciesDetails = async (pokemonId: string) => {
    const results = await fetchData(`pokemon-species/${pokemonId}`);
    if (results !== undefined) {
      console.log(results);
      setSpeciesDetails(results);
    }
  };
  const fetchAllPokemonData = (pokemonId: string) => {
    fetchPokemonDetails(pokemonId);
    fetchPokemonSpeciesDetails(pokemonId);
  };
  const openModal = () => {
    backdropControls.start({ opacity: 1 }), containerControls.start({ y: 0 });
  };
  const closeModal = async () => {
    await Promise.all([
      backdropControls.start({ opacity: 0 }),
      containerControls.start({ y: '100vh' }),
    ]);
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
    openModal();
  }, []);
  useEffect(() => {
    if (id !== undefined) {
      fetchAllPokemonData(id);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [id]);
  useEffect(() => {
    const fetchEvolutions = async () => {
      if (speciesDetails === null) {
        return;
      }
      const evolutionChain = await fetchData(
        speciesDetails.evolution_chain.url,
        true
      );
      if (evolutionChain !== undefined) {
        console.log(evolutionChain);
        function extractEvolutionChainUrls(
          evolutionChainLink: EvolutionChainLink
        ): APIBaseItem[] {
          return evolutionChainLink.species
            ? [
                evolutionChainLink.species,
                ...evolutionChainLink.evolves_to.reduce(
                  (acc: APIBaseItem[], evolvesTo: EvolutionChainLink) => [
                    ...acc,
                    ...extractEvolutionChainUrls(evolvesTo),
                  ],
                  []
                ),
              ]
            : [];
        }
        const chainUrlsAndName = extractEvolutionChainUrls(
          evolutionChain.chain
        );
        const items = chainUrlsAndName.map((o) => {
          return {
            number: o.url ? getIdFromUrl(o.url) : -1,
            name: o.name,
            url: o.url,
          };
        });
        setEvolutions(items);
        // const chainUrls = chainUrlsAndName.map(o => o.url);
        // const promises = chainUrls.map(url => fetchData(url, true));
        // const fetchedEvolutionChainItemsDetails = await Promise.all(promises);
        // console.log(fetchedEvolutionChainItemsDetails.map(x => x.name));
      }
    };
    fetchEvolutions();
  }, [speciesDetails]);
  const formattedEvolutions = evolutions
    ? (evolutions.map((evolution: any) => ({
        name: evolution.name,
        number: evolution.number,
        imageUrl: `${import.meta.env.VITE_IMG_BASE_URL}/${evolution.number}.png`,
      })) as Pokemon[])
    : [];
  return (
    <motion.div
      className="pokemon-details"
      initial={{ opacity: 0 }}
      animate={backdropControls}
      transition={{ duration: 0.3 }}
      onClick={handleOutsideClick}
    >
      <motion.div
        className="pokemon-details__container"
        initial={{ y: '100vh' }}
        animate={containerControls}
        transition={{ type: 'spring', duration: 0.3 }}
      >
        <a className="close-button" onClick={closeModal}>
          ×
        </a>
        <div className="pokemon-details__content" onClick={handleModalClick}>
          {details ? (
            <>
              <h2>
                {id && formatNumber(id)} {pokemonName}
              </h2>
              <div className="pokemon-details__data-container">
                <a className="arrow" onClick={navigateToPrevious}>
                  <FontAwesomeIcon icon="angle-left" />
                </a>
                <div className="pokemon-details__data">
                  <ImageSlider images={imageUrls} />
                  <div className="pokemon-details__types">
                    {details.types.map((t: { type: { name: string } }) => (
                      <TypePill text={t.type.name} key={t.type.name} />
                    ))}
                  </div>
                  {evolutions && <div className="pokemon-details__evolutions section">
                    <h3>Evolutions</h3>
                    {evolutions.length > 1
                      ? <PokemonGrid items={formattedEvolutions} />
                      : <div>{pokemonName} has no evolutions</div>}
                  </div>}
                  <div className="pokemon-details__more-info section">
                    {speciesDetails && (
                      <div className="pokemon-details__species-details section">
                        <SpeciesDetails
                          details={details}
                          speciesDetails={speciesDetails}
                        />
                      </div>
                    )}
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
          ) : (
            <Spinner />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PokemonDetails;
