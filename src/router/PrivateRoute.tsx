import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from 'src/MainLayout';
import { useAppSelector } from 'src/Store';
import { refreshActionDispatcher } from 'src/features/login/auth.action';

const PrivateRoute: React.FC = () => {
    const { isUserLoggedIn } = useAppSelector((store) => store.auth);
    console.log({ isUserLoggedIn });

    useEffect(() => {
        if (!isUserLoggedIn) {
            refreshActionDispatcher();
        }
    }, [isUserLoggedIn]);

    return isUserLoggedIn ? (
        <MainLayout>
            <Outlet />
        </MainLayout>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
