import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export interface RouteObjectType {
    path: string;
    title: string;
    component: JSX.Element;
}

const CustomRoute = (routes: RouteObjectType[]): JSX.Element[] =>
    routes.map((route) => (
        <Route
            path={route.path}
            element={
                <>
                    <Helmet>
                        <title>{`Admin Panel - ${route.title}`}</title>
                    </Helmet>
                    {route.component}
                </>
            }
            key={route.path}
        />
    ));

export default CustomRoute;
