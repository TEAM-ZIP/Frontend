import loading from '../../public/icons/book-snap/loading.gif';

interface LoadingProps {
  text: string;
}

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <img src={loading} className="h-36 w-36" />
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-bold leading-10 text-white">{text}</h1>
        <h1 className="text-base font-normal leading-7 text-gray-100">잠시만 기다려주세요!</h1>
      </div>
    </div>
  );
};

export default Loading;
