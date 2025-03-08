import { HiPencil } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const WriteButton = () => {
  const nav = useNavigate();

  return (
    <div className="fixed bottom-40 left-1/2 mx-auto w-full max-w-[500px] -translate-x-1/2">
      <div
        className="absolute right-[14px] flex items-center gap-1 rounded-full bg-main_1 p-4"
        style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
        onClick={() => nav('create/1')}
      >
        <HiPencil className="h-7 w-7 fill-main_2" />
      </div>
    </div>
  );
};

export default WriteButton;
