import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Zip from '../pages/Zip/Zip';
import MyPage from '../pages/MyPage';
import Bookie from '../pages/Bookie';
import BookSnap from '../pages/Booksnap/BookSnap';
import Layout from '../components/layout';
import Login from '../pages/LoginSignup/Login';
import Signup from '../pages/LoginSignup/Signup';
import SignupAddInfo from '../pages/LoginSignup/SignupAddInfo';
import FindPw from '../pages/FindPW/FindPw';
import FindPw2 from '../pages/FindPW/FindPw2';
import ResetPw from '../pages/FindPW/ResetPw';
import KakaoLogin from '../components/Login/KakaoLogin';
import CreateReview from '../pages/Zip/CreateReview';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateBooksnapReview from '../pages/Booksnap/CreateBooksnapReview';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/zip', element: <Zip /> },
      { path: '/booksnap', element: <BookSnap /> },
      { path: '/mypage', element: <MyPage /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/api/kakao/oauth/login', element: <KakaoLogin /> },
  { path: '/signup/add', element: <SignupAddInfo /> },
  { path: '/find-pw', element: <FindPw /> },
  { path: '/find-pw2', element: <FindPw2 /> },
  { path: '/reset-pw', element: <ResetPw /> },
  { path: '/bookie', element: <Bookie /> },
  {
    path: 'zip/create-review',
    element: (
      <ProtectedRoute>
        <CreateReview />
      </ProtectedRoute>
    ),
  },
  {
    path: 'booksnap/create',
    element: (
      <ProtectedRoute>
        <CreateBooksnapReview />
      </ProtectedRoute>
    ),
  },
]);
