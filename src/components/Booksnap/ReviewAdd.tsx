import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface ReviewAdd {
  title: string;
  onClick: () => void;
  color: string;
}

const ReviewAdd = ({ title, onClick, color }: ReviewAdd) => {
  const colorMap: Record<string, string> = {
    pink: '#DEBBCC',
    mint: '#91AAA4',
  };

  const iconColor = colorMap[color] ?? '#CCCCCC';

  return (
    <div className={`bg-${color} flex justify-between gap-[10px] rounded-[10px] p-[10px]`} onClick={onClick}>
      <div className="whitespace-pre-line text-body3 font-bold leading-5 text-bg">{title}</div>
      <div className="mt-[20px] flex p-[10px]">
        <LibraryBooksIcon sx={{ fontSize: 40, fill: iconColor }} />
        <AddCircleOutlineIcon sx={{ fontSize: 40, fill: iconColor }} />
      </div>
    </div>
  );
};

export default ReviewAdd;
