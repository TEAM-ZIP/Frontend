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
import CreateBooksnapReview1 from '../pages/Booksnap/CreateBooksnapReview1';
import CreateBooksnapReview2 from '../pages/Booksnap/CreateBooksnapReview2';
import BookSearch from '../pages/Booksnap/BookSearch';
import IndiCreateBookReview1 from '../pages/Booksnap/IndiCreateBookReveiw1';
import IndiCreateBookReview2 from '../pages/Booksnap/IndiCreateBookReview2';
import CreateBook from '../pages/Booksnap/CreateBook';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/zip', element: <Zip /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/booksnap', element: <BookSnap /> },
      { path: '/booksnap/search', element: <BookSearch /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/api/kakao/oauth/login', element: <KakaoLogin /> },
  { path: '/signup/add', element: <SignupAddInfo /> },
  { path: '/find-pw', element: <FindPw /> },
  { path: '/find-pw2', element: <FindPw2 /> },
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
    path: 'booksnap/create/1',
    element: (
      <ProtectedRoute>
        <CreateBooksnapReview1 />
      </ProtectedRoute>
    ),
  },
  {
    path: 'booksnap/create/2',
    element: (
      <ProtectedRoute>
        <CreateBooksnapReview2 />
      </ProtectedRoute>
    ),
  },
  {
    path: 'booksnap/create/indi/1',
    element: (
      <ProtectedRoute>
        <IndiCreateBookReview1 />
      </ProtectedRoute>
    ),
  },
  {
    path: 'booksnap/create/indi/2',
    element: (
      <ProtectedRoute>
        <IndiCreateBookReview2 />
      </ProtectedRoute>
    ),
  },
  {
    path: 'booksnap/create/book',
    element: (
      <ProtectedRoute>
        <CreateBook />
      </ProtectedRoute>
    ),
  },
  { path: '/reset-pw', element: <ResetPw /> },
]);
