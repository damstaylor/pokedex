import './TypePill.scss';

interface TypePillProps {
  text: string;
}

const TypePill: React.FC<TypePillProps> = ({ text }) => {
  return (
    <div className={`typepill ${text}`}>
      <div>{text}</div>
    </div>
  );
};

export default TypePill;
