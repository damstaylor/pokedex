import './SpeciesDetails.scss';

interface SpeciesDetailsProps {
  details: any;
  speciesDetails: any;
};

function formatDmHeight(heightInDm: number): string {
  const heightInM = heightInDm / 10;
  return heightInM >= 1 ? `${heightInM.toFixed(1)} m` : `${(heightInM * 10).toFixed(1)} cm`;
}
function formatHgWeight(weightInHg: number): string {
  const weightInKg = weightInHg / 10;
  return weightInKg >= 1 ? `${weightInKg.toFixed(1)} kg` : `${(weightInKg * 100).toFixed(1)} g`;
}

const SpeciesDetails: React.FC<SpeciesDetailsProps> = ({ details, speciesDetails }) => {
  const habitat = speciesDetails?.habitat?.name || 'Unknown';
  const genus = speciesDetails?.genera?.find((it: Genus) => it.language.name === 'en')?.genus || 'Unknown';
  const generationStr = speciesDetails?.generation?.name;
  const generationNb = (generationStr.match(/generation-(.*)/) || [])[1].toUpperCase();
  const description = speciesDetails?.flavor_text_entries?.find((e: any) => e.language.name === 'en' && e.version.name === 'x')?.flavor_text;
  return (
    <div className="species-details">
      <h3>General info</h3>
      <p>Generation {generationNb}</p>
      <p>Height: {formatDmHeight(details.height)}</p>
      <p>Weight: {formatHgWeight(details.weight)}</p>
      {speciesDetails &&
        <>
          <p>Habitat: {habitat}</p>
          <p>Genus: {genus}</p>
          {description &&
            <p className="species-details__description">
              {description}
            </p>
          }
        </>
      }
    </div>
  );
};

export default SpeciesDetails;
