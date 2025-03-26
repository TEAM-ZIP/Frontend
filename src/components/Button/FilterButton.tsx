import TuneIcon from '@mui/icons-material/Tune';

interface FilterButtonProps {
  text: string;
}

const FilterButton = ({ text }: FilterButtonProps) => {
  return (
    <button
      className={`box-border whitespace-nowrap rounded-[20px] border-[1px] border-solid border-white px-3 py-[7px] text-[12px] font-bold text-white`}
    >
      {text == '필터' && <TuneIcon sx={{ fontSize: 18 }} />}
      {text}
    </button>
  );
};

export default FilterButton;
