import { useNavigate } from 'react-router-dom';
import Header from '../../components/Common/Header';
import LoginBox from '../../components/MyPage/LoginBox';

const MyPage = () => {
  const nav = useNavigate();

  return (
    <div className="px-10 pt-[120px]">
      <Header title="MY PAGE" />
      <LoginBox />
    </div>
  );
};

export default MyPage;
