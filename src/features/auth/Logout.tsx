import { useEffect, useNavigate } from 'src/deps'
import { useAppSelector } from 'src/Store'
import { API_STATUS } from 'src/utils/callApi'
import { logoutActionDispatcher } from './auth.action'

const Logout = () => {
	const navigate = useNavigate()
	const { loading, status } = useAppSelector((state) => state.auth)

	useEffect(() => {
		logoutActionDispatcher()
	}, [])

	useEffect(() => {
		if (status !== API_STATUS.PENDING) {
			return navigate('/login', { replace: true })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading])

	if (loading) return <div>Logging out...</div>

	return <></>
}

export default Logout
