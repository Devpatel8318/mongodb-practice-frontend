import React, { JSX } from 'react'
import { Helmet, Route } from 'src/deps'

export interface RouteObjectType {
	path: string
	title: string
	component: React.ComponentType
}

const CustomRoute = (routes: RouteObjectType[]): JSX.Element[] => {
	return routes.map((route) => {
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
}

export default CustomRoute
