import { Route, Helmet } from 'src/deps'

export interface RouteObjectType {
	path: string
	title: string
	component: (() => JSX.Element) | React.FC<{}>
}

const CustomRoute = (routes: RouteObjectType[]): JSX.Element[] =>
	routes.map((route) => (
		<Route
			path={route.path}
			element={
				<>
					<Helmet>
						<title>{`MongoAcademy - ${route.title}`}</title>
					</Helmet>
					<route.component />
				</>
			}
			key={route.path}
		/>
	))

export default CustomRoute
