import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface ReviewAdd {
  title: string;
}

const ReviewAdd = ({ title }: ReviewAdd) => {
  return (
    <div className="bg-pink flex justify-between gap-[10px] rounded-[10px] p-[10px]">
      <div className="whitespace-pre-line text-body3 font-bold leading-5 text-bg">{title}</div>
      <div className="mt-[20px] flex p-[10px]">
        <LibraryBooksIcon sx={{ fontSize: 40, fill: '#DEBBCC' }} />
        <AddCircleOutlineIcon sx={{ fontSize: 40, fill: '#DEBBCC' }} />
      </div>
    </div>
  );
};

export default ReviewAdd;
