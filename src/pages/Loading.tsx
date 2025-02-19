import loading_logo from '../../public/icons/login-signup/Logo.png';

interface LoadingProps {
  text: string;
}

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-11">
      <img src={loading_logo} className="h-36 w-36" />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold leading-10">{text}</h1>
        <h1 className="text-base font-normal leading-7 text-gray-600">잠시만 기다려주세요!</h1>
      </div>
    </div>
  );
};

export default Loading;
