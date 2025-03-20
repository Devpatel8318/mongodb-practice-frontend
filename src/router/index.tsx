import { BrowserRouter, Route, Routes } from 'src/deps';

import Dashboard from 'src/features/dashboard/Dashboard';
import Login from 'src/features/auth/Login';
import PrivateRoute from './PrivateRoute';
import NotFound from 'src/features/NotFound/NotFound';
import PublicRoute from './PublicRoute';
import CustomRoute, { RouteObjectType } from './CustomRoute';
import Logout from 'src/features/auth/Logout';
import Signup from 'src/features/auth/Signup';
import ForgetPassword from 'src/features/auth/ForgetPassword';

export const privateRoutes: RouteObjectType[] = [
    ...['/dashboard', '/'].map((path) => ({
        path,
        title: 'Dashboard',
        component: <Dashboard />,
    })),
    {
        path: '/logout',
        title: 'Logout',
        component: <Logout />,
    },
];

const publicRoutes: RouteObjectType[] = [
    ...['/forget', 'forget-password'].map((path) => ({
        path,
        title: 'Forget Password',
        component: <ForgetPassword />,
    })),
    ...['/signup', 'register'].map((path) => ({
        path,
        title: 'Register',
        component: <Signup />,
    })),
    ...['/login', 'signin'].map((path) => ({
        path,
        title: 'Login',
        component: <Login />,
    })),
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
