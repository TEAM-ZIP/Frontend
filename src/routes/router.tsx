import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../pages/main';
import Layout from '../components/layout';
import ProtectedRoute from '../components/protectedRoute';
import ChatBot from '../pages/chatBot';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
	},
	{
		path: 'page',
		element: (
			<ProtectedRoute>
				<Layout />
			</ProtectedRoute>
		),
		children: [
			{
				path: 'chat',
				element: <ChatBot />,
			},
		],
	},
]);
