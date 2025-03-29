import { useNavigate } from 'react-router-dom';

interface NoResultProps {
  text: string;
  color?: string;
}

const NoResult = ({ text, color }: NoResultProps) => {
  const nav = useNavigate();

  return (
    <div className="flex flex-col items-center gap-5 p-10">
      <div className={`bg-${color} flex h-20 w-20 items-center justify-center rounded-full text-heading4 font-bold`}>
        ?
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className={`text-yellow text-body1 font-bold`}>검색 결과가 없어요!</p>
        <p className="cursor-pointer text-body4 font-light text-white" onClick={() => nav('/booksnap/create/book')}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default NoResult;
