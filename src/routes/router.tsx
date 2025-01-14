import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Zip from '../pages/Zip';
import MyPage from '../pages/MyPage';
import Bookie from '../pages/Bookie';
import BookSnap from '../pages/BookSnap';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

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
]);
