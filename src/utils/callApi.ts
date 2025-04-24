import {
	axios,
	AxiosError,
	AxiosResponse,
	CancelToken,
	CancelTokenSource,
} from 'src/deps'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'

import axiosInstance from './axiosInstance'

export type API_STATUS_TYPE = 'success' | 'pending' | 'rejected' | null

export enum API_STATUS {
	SUCCESS = 'success',
	PENDING = 'pending',
	REJECTED = 'rejected',
}

const callApi = async <T>(
	apiURL: string,
	apiMethod: 'GET' | 'POST' | 'PUT' | 'DELETE',
	apiData?: object
): Promise<SuccessResponse<T>> => {
	const requestSource: CancelTokenSource = axios.CancelToken.source()

	const requestBody: {
		url: string
		method: string
		cancelToken: CancelToken
		data?: object
		withCredentials: boolean
	} = {
		url: apiURL,
		method: apiMethod,
		cancelToken: requestSource.token,
		withCredentials: true,
	}

	if (['POST', 'PUT', 'DELETE'].includes(apiMethod)) {
		requestBody.data = apiData || {}
	} else {
		delete requestBody.data
	}

	return new Promise((resolve, reject) => {
		axiosInstance(requestBody)
			.then((response: AxiosResponse<SuccessResponse<T>>) => {
				resolve(response?.data || { message: 'ok' })
			})
			.catch((err: AxiosError<ErrorResponse>) => {
				const errObj: ErrorResponse = err.response?.data || {
					message: err.message || 'Unknown error',
				}
				reject(errObj)
			})
	})
}

export default callApi
