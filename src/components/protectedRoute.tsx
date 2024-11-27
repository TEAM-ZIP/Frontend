import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	// 일단 true로 설정 -> 나중에 변경
	const isAuthenticated = true;

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return children;
};

export default ProtectedRoute;
