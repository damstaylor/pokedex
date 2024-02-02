import './BarStat.scss';

interface BarProps {
  label: string;
  value: number;
}

const BarStat = ({ label, value }: BarProps) => {
  const valueOutOf20 = value / 255 * 20;
  const fragmentCount = Math.floor(valueOutOf20);
  const fragments = Array.from({ length: 20 }, (_, index) => (
    <div className={`bar-stat__fragment ${index < fragmentCount ? 'filled' : 'empty'}`} key={index} />
  ));
  return (
    <div className="bar-stat">
      <div className="bar-stat__label">{label}</div>
      <div className="bar-stat__bar">
        {fragments}
      </div>
    </div>
  );
};

export default BarStat;
