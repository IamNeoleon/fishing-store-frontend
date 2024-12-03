import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
	isAllowed: boolean; // Условие для доступа
	redirectTo?: string; // URL для редиректа, если доступ запрещён
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAllowed, redirectTo = '/' }) => {
	if (!isAllowed) {
		return <Navigate to={redirectTo} replace />;
	}
	return <Outlet />;
};

export default ProtectedRoute;
