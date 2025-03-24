interface MoreButtonProps {
  onClick: () => void;
}

const MoreButton = ({ onClick }: MoreButtonProps) => {
  return (
    <div
      className="bg-mint flex h-[1.825rem] w-[6.25rem] items-center justify-center rounded-[20px] py-4 text-body4 text-bg"
      onClick={onClick}
    >
      더 보기
    </div>
  );
};

export default MoreButton;
