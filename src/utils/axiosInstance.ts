import { axios } from 'src/deps'
import { logoutUserDispatcher } from 'src/Store/reducers/auth.reducer'

import { BACKEND_URL } from './config'
import { tryCatch } from './tryCatch'

let isRefreshing = false
let refreshQueue: (() => void)[] = []

const instance = axios.create({
	withCredentials: true,
	baseURL: BACKEND_URL,
})

instance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		if (
			error.response?.status === 401 &&
			!originalRequest.url.includes('/auth/refresh')
		) {
			if (!isRefreshing) {
				isRefreshing = true

				const [_, error] = await tryCatch(
					axios.get(`${BACKEND_URL}/auth/refresh`, {
						withCredentials: true,
					})
				)

				isRefreshing = false
				// Process queued requests
				refreshQueue.forEach((resolve) => resolve())
				refreshQueue = []

				if (!error) {
					return instance(originalRequest)
				} else {
					logoutUserDispatcher()
				}
			} else {
				refreshQueue.push(() => {
					instance(originalRequest)
				})
			}
		}
		return Promise.reject(error)
	}
)

export default instance
