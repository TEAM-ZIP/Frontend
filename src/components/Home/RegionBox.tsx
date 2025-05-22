import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useNavigate } from 'react-router-dom';

interface RegionBoxProps {
  text: string;
}

const RegionBox = ({ text }: RegionBoxProps) => {
  const nav = useNavigate();
  return (
    <div
      className={`p-[10px] ${text == '내 위치' ? 'bg-orange text-white' : 'bg-green text-[#544F4F]'} flex aspect-square flex-col gap-[15px] rounded-[10px]`}
      onClick={() => nav(`/zip?search=${text}`)}
    >
      <LocationSearchingIcon />
      <p>{text}</p>
    </div>
  );
};

export default RegionBox;
