import BarStat from '@/components/BarStat/BarStat.tsx';
import './Stats.scss';

interface Stat {
  label: string;
  value: number;
}

interface StatsProps {
  stats: Stat[];
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <div className="stats">
      <h3>Stats</h3>
      <div className="stats__container">
      {stats.map((stat: Stat, index) => (
        <BarStat key={`bar-${index}`} label={stat.label} value={stat.value} />
        ))}
    </div>
        </div>
  );
};

export default Stats;
