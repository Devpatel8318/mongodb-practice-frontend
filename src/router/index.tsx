import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from 'src/features/dashboard/Dashboard';
import Login from 'src/features/auth/Login';
import PrivateRoute from './PrivateRoute';
import NotFound from 'src/features/NotFound/NotFound';
import PublicRoute from './PublicRoute';
import CustomRoute, { RouteObjectType } from './CustomRoute';
import Logout from 'src/features/auth/Logout';

export const privateRoutes: RouteObjectType[] = [
    { path: '/', title: 'Dashboard', component: <Dashboard /> },
    {
        path: '/dashboard',
        title: 'Dashboard',
        component: <Dashboard />,
    },
    {
        path: '/logout',
        title: 'Logout',
        component: <Logout />,
    },
];

const publicRoutes: RouteObjectType[] = [
    {
        path: '/login',
        title: 'Login',
        component: <Login />,
    },
];

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<PrivateRoute />}>
                {CustomRoute(privateRoutes)}
            </Route>
            <Route element={<PublicRoute />}>{CustomRoute(publicRoutes)}</Route>
            <Route path="*" element={<NotFound />} key={'*'} />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
