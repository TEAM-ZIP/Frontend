import LocationSearchingIcon from '@mui/icons-material/LocationSearching';

interface RegionBoxProps {
  text: string;
}

const RegionBox = ({ text }: RegionBoxProps) => {
  return (
    <div
      className={`p-[10px] ${text == '내 위치' ? 'bg-orange text-white' : 'bg-green text-[#544F4F]'} flex aspect-square flex-col gap-[15px] rounded-[10px]`}
    >
      <LocationSearchingIcon />
      <p>{text}</p>
    </div>
  );
};

export default RegionBox;
