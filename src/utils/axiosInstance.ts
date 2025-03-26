import { axios } from 'src/deps';

import { BACKEND_URL } from './config';
import { logoutUserDispatcher } from 'src/Store/reducers/auth.reducer';

let isRefreshing = false;
let refreshQueue: (() => void)[] = [];

const instance = axios.create({
    withCredentials: true,
    baseURL: BACKEND_URL,
});

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    await axios.get(`${BACKEND_URL}/auth/refresh`, {
                        withCredentials: true,
                    });

                    return instance(originalRequest);
                } catch (refreshError) {
                    // no need to clear the token as both are invalid, so only loggout the user by updating redux state
                    logoutUserDispatcher();
                } finally {
                    isRefreshing = false;
                    // Process queued requests
                    refreshQueue.forEach((resolve) => resolve());
                    refreshQueue = [];
                }
            } else {
                refreshQueue.push(() => {
                    instance(originalRequest);
                });
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
