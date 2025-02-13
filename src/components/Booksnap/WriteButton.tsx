import { HiPencil } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const WriteButton = () => {
  const nav = useNavigate();

  return (
    <div
      className="fixed bottom-24 right-[14px] flex items-center gap-1 rounded-full bg-main_2 p-4"
      style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
      onClick={() => nav('create')}
    >
      <HiPencil className="h-7 w-7 fill-main_1" />
    </div>
  );
};

export default WriteButton;
