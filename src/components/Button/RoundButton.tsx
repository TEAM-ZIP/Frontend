import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { TbCurrentLocation } from 'react-icons/tb';

interface RoundButtonProps {
  type: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLiked?: boolean;
}

const RoundButton = ({ type, onClick, isLiked }: RoundButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => {
        setIsClicked(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  const icon =
    type == 'heart' ? (
      isLiked ? (
        <FaHeart className="h-5 w-5 text-orange" />
      ) : (
        <FaHeart className="h-5 w-5 text-[#979797]" />
      )
    ) : (
      <TbCurrentLocation
        className={`h-6 w-6 ${isClicked ? 'text-orange' : 'text-[#979797]'} duration-400 transition`}
      />
    );

  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-full bg-bg"
      onClick={(e) => {
        setIsClicked(true);
        if (onClick) onClick(e);
      }}
    >
      {icon}
    </button>
  );
};

export default RoundButton;
