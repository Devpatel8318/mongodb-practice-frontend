import { React, useEffect, Navigate, Outlet, useLocation } from 'src/deps'

import MainLayout from 'src/MainLayout'
import { useAppSelector } from 'src/Store'
import { refreshActionDispatcher } from 'src/features/auth/auth.action'
import { userSettingActionDispatcher } from 'src/Store/globalActions/user.action'

const PrivateRoute: React.FC = () => {
	const { isUserLoggedIn } = useAppSelector((store) => store.auth)
	const location = useLocation()

	useEffect(() => {
		// NOTE: logout route although being private route, we do not need to check for user login
		if (location.pathname.includes('/logout')) return

		if (!isUserLoggedIn) {
			refreshActionDispatcher({ doNotShowAlert: true })
		} else {
			userSettingActionDispatcher()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return isUserLoggedIn ? (
		<MainLayout>
			<Outlet />
		</MainLayout>
	) : (
		<Navigate to="/login" />
	)
}

export default PrivateRoute
