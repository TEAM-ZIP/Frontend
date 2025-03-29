import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { IoCloseOutline } from 'react-icons/io5';

interface HeaderProps {
  closeBottomSheet: () => void;
  viewName: string;
  resultCount: number;
}

const MaxHeader = ({ closeBottomSheet, viewName, resultCount }: HeaderProps) => {
  return (
    <div className="mb-[-12px] flex items-center bg-bg px-2 py-3">
      <div className="flex cursor-pointer items-center justify-center p-2.5" onClick={closeBottomSheet}>
        <IoCloseOutline size={30} className="stroke-white" />
      </div>
      <div className="flex flex-1 items-end justify-center gap-2 text-[20px] font-bold tracking-[-0.8px]">
        {viewName === 'ZIP 검색 결과' ? (
          <div className="text-white">
            <span className="text-green">ZIP</span> 검색 결과
          </div>
        ) : (
          <div className="text-white">{viewName}</div>
        )}
        {viewName !== '서점 상세 정보' && (
          <div className="flex items-center gap-[2px]">
            <FmdGoodIcon sx={{ fontSize: 14, fill: '#CFCCD4' }} />
            <p className="text-[12px] leading-6 text-[#CFCCD4]">{resultCount}개</p>
          </div>
        )}
      </div>
      <div className="w-11" />
    </div>
  );
};

export default MaxHeader;
