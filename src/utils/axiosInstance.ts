import axios from 'axios';
import { BACKEND_URL } from './config';
import getToken from './getToken';
import { logoutUser } from 'src/Store/reducers/auth.reducer';
import { appDispatcher } from 'src/Store';

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
        if (
            error.response?.status === 401 &&
            error.response.data?.message === 'Permission denied.'
        ) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const getRefreshResponse = await axios.get(
                        `${BACKEND_URL}/user/me`,
                        {
                            withCredentials: true,
                        }
                    );

                    // Update the access token
                    originalRequest.headers[
                        'Authorization'
                    ] = `Bearer ${getRefreshResponse.data.accessToken}`;

                    // Retry the original request with the new token
                    return instance(originalRequest);
                } catch (refreshError) {
                    // no need to clear the token as both are invalid, so only loggout the user by updating redux state
                    appDispatcher(logoutUser());
                } finally {
                    isRefreshing = false;
                    // Process queued requests
                    refreshQueue.forEach((resolve) => resolve());
                    refreshQueue = [];
                }
            } else {
                refreshQueue.push(() => {
                    originalRequest.headers[
                        'Authorization'
                    ] = `Bearer ${getToken()}`;
                    instance(originalRequest);
                });
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
