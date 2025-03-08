import { useEffect } from 'react';
import Check from '../../../public/icons/book-snap/check.svg?react';

type ToastProps = {
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
};

const Toast = ({ setToast, title }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setToast]);

  return (
    <div className="animate-fade-in-out fixed left-1/2 top-4 z-50 flex w-[80%] -translate-x-1/2 items-center rounded-lg bg-white px-4 py-2 text-base font-semibold shadow-lg">
      <Check className="mr-2 h-[18px] w-[18px]" />
      <span>{title}</span>
    </div>
  );
};

export default Toast;
