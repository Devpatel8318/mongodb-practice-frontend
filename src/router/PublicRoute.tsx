import { React, Navigate, Outlet } from 'src/deps';

import { useAppSelector } from 'src/Store';

const PrivateRoute: React.FC = () => {
    const { isUserLoggedIn } = useAppSelector((store) => store.auth);
    return isUserLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
