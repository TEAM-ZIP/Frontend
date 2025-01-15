import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Zip from '../pages/Zip';
import MyPage from '../pages/MyPage';
import Bookie from '../pages/Bookie';
import BookSnap from '../pages/BookSnap';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import SignupAddInfo from '../pages/SignupAddInfo';
import FindPw from '../pages/FindPw';
import FindPw2 from '../pages/FindPw2';
import ResetPw from '../pages/ResetPw';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: '/zip', element: <Zip /> },
			{ path: '/booksnap', element: <BookSnap /> },
			{ path: '/bookie', element: <Bookie /> },
			{ path: '/mypage', element: <MyPage /> },
		],
	},
	{ path: '/login', element: <Login /> },
	{ path: '/signup', element: <Signup /> },
	{ path: '/signup/add', element: <SignupAddInfo /> },
	{ path: '/find-pw', element: <FindPw /> },
	{ path: '/find-pw2', element: <FindPw2 /> },
	{ path: '/reset-pw', element: <ResetPw /> },
]);
