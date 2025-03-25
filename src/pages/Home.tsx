import HomeHeader from '../components/Header/HomeHeader';
import StarIcon from '@mui/icons-material/Star';
import BookieBox from '../components/Home/BookieBox';
import PopularBox from '../components/Home/PopularBox';
import ReportBookstore from '../components/Home/ReportBookstore';
import Region from '../components/Home/Region';
import BookReview from '../components/Home/BookReview';
import ReportStore from '../components/Home/ReportStore';
import Contact from '../components/Home/Contact';
import MadeBy from '../components/Home/MadeBy';

const Home = () => {
  return (
    <div className="flex h-full flex-col bg-bg px-[20px] pt-[52px] scrollbar-none">
      {/* 헤더 */}
      <HomeHeader />
      {/* 내용 */}
      <div className="flex flex-col gap-[10px] pt-[20px]">
        {/* 별 */}
        <div className="flex gap-[10px]">
          <StarIcon sx={{ fontSize: 40, fill: '#C1D201' }} />
          <StarIcon sx={{ fontSize: 40, fill: '#E27451' }} />
        </div>
        {/* 이름 */}
        <div className="text-heading4 font-bold">
          <div className="flex leading-7">
            <h1 className="text-green">BOOK</h1>
            <h1 className="text-orange">STORE</h1>
          </div>
          <h1 className="text-white">ZIP</h1>
        </div>
        {/* 설명 */}
        <p className="text-body3 text-white">독립서점 찾기부터 독립서적, 일반 서적 추천까지</p>
        {/* 광고? 컴포넌트들 */}
        <div className="flex gap-[10px] py-[10px]">
          <BookieBox />
          <PopularBox />
        </div>
        <ReportBookstore />
        <Region />
        <BookReview />
        <ReportStore />
        <Contact />
        <MadeBy />
      </div>
    </div>
  );
};

export default Home;
