import { FaRegHeart } from 'react-icons/fa';
import { TbCurrentLocation } from 'react-icons/tb';

interface RoundButtonProps {
  type: string;
}

const RoundButton = ({ type }: RoundButtonProps) => {
  const icon =
    type == 'heart' ? (
      <FaRegHeart className="h-5 w-5 text-[#979797]" />
    ) : (
      <TbCurrentLocation className="h-6 w-6 text-[#979797]" />
    );
  return <button className="w-10 h-10 bg-white justify-items-center rounded-full">{icon}</button>;
};

export default RoundButton;
