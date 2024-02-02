import './TypePill.scss';

interface TypePillProps {
  text: string;
}

const TypePill = ({ text }: TypePillProps) => {
  return (
    <div className={`typepill ${text}`}>
      <div className="typepill__text">{text}</div>
    </div>
  );
};

export default TypePill;
