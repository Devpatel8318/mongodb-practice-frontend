import type { JSX } from 'react'
import { CenteredLoader } from 'src/components/Loader/Loader'
import { ErrorBoundary, Helmet, React, Route } from 'src/deps'
import ErrorFallback from 'src/features/fallbackPages/ErrorFallback'

const { Suspense } = React

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
						<ErrorBoundary FallbackComponent={ErrorFallback}>
							<Suspense fallback={<CenteredLoader />}>
								<Component />
							</Suspense>
						</ErrorBoundary>
					</>
				}
				key={route.path}
			/>
		)
	})
}

export default CustomRoute
