import React, { JSX } from 'react'
import { Route, Helmet } from 'src/deps'

export interface RouteObjectType {
	path: string
	title: string
	component: React.ComponentType
}

const CustomRoute = (routes: RouteObjectType[]): JSX.Element[] =>
	routes.map((route) => {
		const Component = route.component

		return (
			<Route
				path={route.path}
				element={
					<>
						<Helmet>
							<title>{`MongoAcademy - ${route.title}`}</title>
						</Helmet>
						<Component />
					</>
				}
				key={route.path}
			/>
		)
	})

export default CustomRoute
