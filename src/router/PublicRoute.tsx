import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/Store';

const PrivateRoute: React.FC = () => {
    const { isUserLoggedIn } = useAppSelector((store) => store.auth);
    return isUserLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
