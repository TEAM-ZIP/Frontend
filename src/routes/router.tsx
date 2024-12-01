import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../pages/main';
import Layout from '../components/layout';
import ProtectedRoute from '../components/protectedRoute';
import ChatBot from '../pages/chatBot';
import { Loader } from '@react-three/drei';
import { Leva } from 'leva';
import { Canvas } from '@react-three/fiber';
import { Experience } from '../components/Experience';

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
				element: (
					<>
						<Loader />
						<Leva hidden />
						<ChatBot />
						<div className="fixed bottom-0 left-0 right-0 top-0 z-0 flex h-screen w-screen bg-gradient-to-b from-[#c4f2ce] to-[#f9f4f4]">
							<Canvas
								shadows
								camera={{ position: [0, 0, 5], fov: 30 }}
								style={{
									pointerEvents: 'none',
								}}
							>
								<Experience />
							</Canvas>
						</div>
					</>
				),
			},
		],
	},
]);
