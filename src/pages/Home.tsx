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
import Name from '../components/Home/Name';
import { searchBookstore } from '../api/zip.api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../components/Modal/Modal';
import AddBookstoreModal from '../components/Modal/AddBookstoreModal';

const Home = () => {
  const nav = useNavigate();
  const [searchWord, setSearchWord] = useState('');
  const [modal, setModal] = useState(false);

  const handleSearch = () => {
    nav(`/zip?search=${searchWord}`);
  };

  return (
    <div className="flex h-full flex-col bg-bg px-[20px] pt-[52px] scrollbar-none">
      {/* 헤더 */}
      <HomeHeader searchWord={searchWord} setSearchWord={setSearchWord} onSearch={handleSearch} />
      {/* 내용 */}
      <div className="flex flex-col gap-[10px] pt-[20px]">
        {/* 별 */}
        <Name text="ZIP" />
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
        <ReportStore onClick={() => setModal(true)} />
        <Contact />
        <MadeBy />
      </div>
      {modal && (
        <Modal>
          <AddBookstoreModal setModalOpen={setModal} name="" />
        </Modal>
      )}
    </div>
  );
};

export default Home;
