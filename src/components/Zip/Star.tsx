import { FaStar } from 'react-icons/fa6';

interface StarProps {
  rating: number;
  setRating: (value: number) => void;
  size: number;
}

const Star = ({ rating, setRating, size }: StarProps) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex cursor-pointer" key={index}>
          <FaStar
            className={rating > index ? 'text-main_1' : 'text-gray_1'}
            size={size}
            onClick={() => setRating(index + 1)}
          />
        </div>
      ))}
    </div>
  );
};
export default Star;
