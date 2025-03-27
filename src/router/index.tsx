import { BrowserRouter, Route, Routes } from 'src/deps'

import PrivateRoute from './PrivateRoute'
import NotFound from 'src/features/NotFound/NotFound'
import PublicRoute from './PublicRoute'
import CustomRoute from './CustomRoute'
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
