interface MoreButtonProps {
  onClick: () => void;
}

const MoreButton = ({ onClick }: MoreButtonProps) => {
  return (
    <div
      className="flex h-[1.825rem] w-[6.25rem] items-center justify-center rounded-[20px] bg-main_1 py-4 text-body4 text-white"
      onClick={onClick}
    >
      더 보기
    </div>
  );
};

export default MoreButton;
