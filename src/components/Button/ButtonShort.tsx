import { ReactElement, useEffect, useState } from 'react';
import { HiPencil } from 'react-icons/hi2';
import { MdBookmarkAdd } from 'react-icons/md';

interface ButtonShortProps {
  type: (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];
  onClick?: () => void;
}

export const BUTTON_TYPE = {
  REVIEW: 'review',
  ADD: 'book',
} as const;

interface DefaultType {
  buttonText: string;
  icon: ReactElement;
}

const ButtonShort = ({ type, onClick }: ButtonShortProps) => {
  const DEFAULT_TYPE = {
    buttonText: '',
    icon: <></>,
  };
  const [buttonType, setButtonType] = useState<DefaultType>(DEFAULT_TYPE);

  useEffect(() => {
    switch (type) {
      case BUTTON_TYPE.REVIEW:
        setButtonType({
          buttonText: '리뷰 쓰기',
          icon: <HiPencil className="fill-white" />,
        });
        break;
      case BUTTON_TYPE.ADD:
        setButtonType({
          buttonText: '책 담기',
          icon: <MdBookmarkAdd className="fill-main_2" />,
        });
    }
  }, []);
  return (
    <div className="flex h-[26px] items-center gap-[6px] rounded-[10px] bg-main_1 px-[10px] py-[6px]" onClick={onClick}>
      {buttonType.icon}
      <p className="text-[13px] font-normal tracking-normal text-main_2">{buttonType.buttonText}</p>
    </div>
  );
};

export default ButtonShort;
