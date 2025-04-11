import { useEffect, useNavigate } from 'src/deps'
import { useAppSelector } from 'src/Store'
import { API_STATUS } from 'src/utils/callApi'

import { logoutActionDispatcher } from './auth.dispatcher'

const Logout = () => {
	const navigate = useNavigate()
	const { loading, status } = useAppSelector((state) => state.auth)

	useEffect(() => {
		logoutActionDispatcher()
	}, [])

	const navigateToLogin = async () => {
		await navigate('/login', { replace: true })
	}

	useEffect(() => {
		if (status !== API_STATUS.PENDING) {
			navigateToLogin()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	if (loading) return <div>Logging out...</div>

	return <>Logout</>
}

export default Logout
