import { BrowserRouter, Route, Routes } from 'src/deps'
import NotFound from 'src/features/fallbackPages/NotFound'

import CustomRoute from './CustomRoute'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import { privateRoutes, publicRoutes } from './routes'

const AppRoutes = () => (
	<BrowserRouter>
		<Routes>
			<Route element={<PublicRoute />}>{CustomRoute(publicRoutes)}</Route>
			<Route element={<PrivateRoute />}>
				{CustomRoute(privateRoutes)}
			</Route>
			<Route path="*" element={<NotFound />} key={'*'} />
		</Routes>
	</BrowserRouter>
)

export default AppRoutes
