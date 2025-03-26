import StarIcon from '@mui/icons-material/Star';

interface NameProps {
  text: string;
}

const Name = ({ text }: NameProps) => {
  return (
    <div className="flex flex-col gap-[10px]">
      {text == 'ZIP' && (
        <div className="flex gap-[10px]">
          <StarIcon sx={{ fontSize: 40, fill: '#C1D201' }} />
          <StarIcon sx={{ fontSize: 40, fill: '#E27451' }} />
        </div>
      )}
      {/* 이름 */}
      <div className="text-heading4 font-bold">
        <div className="flex leading-7">
          <h1 className="text-green">BOOK</h1>
          <h1 className="text-orange">STORE</h1>
        </div>
        <h1 className="text-white">{text}</h1>
      </div>
    </div>
  );
};

export default Name;
