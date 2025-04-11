import { SerializedError } from '@reduxjs/toolkit'
import { createSlice } from 'src/deps'
import {
	logoutAction,
	oauthGoogleAction,
	refreshAction,
	signInAction,
	signUpAction,
} from 'src/features/auth/auth.action'
import { appDispatcher } from 'src/Store'
import { ErrorResponse, ReducerErrorObject } from 'src/Types/global'
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi'
import showToast from 'src/utils/showToast'

export interface AuthStateType {
	status: API_STATUS_TYPE
	error: null | ReducerErrorObject
	loading: boolean
	isUserLoggedIn: boolean
	doNotShowAlert: boolean
}

export const initialState: AuthStateType = {
	status: null,
	error: null,
	loading: false,
	isUserLoggedIn: false,
	doNotShowAlert: false,
}

const handlePending = (state: AuthStateType) => {
	Object.assign(state, {
		status: API_STATUS.PENDING,
		loading: true,
		error: null,
		doNotShowAlert: null,
	})
}

const handleFulfilled = (
	state: AuthStateType,
	action: { payload?: ErrorResponse }
) => {
	const { payload } = action
	Object.assign(state, {
		status: API_STATUS.SUCCESS,
		loading: false,
		error: null,
		isUserLoggedIn: true,
	})
	localStorage.setItem('isUserLoggedIn', 'true')
	if (payload?.message) showToast('success', payload.message)
}

const handleRejected = (
	state: AuthStateType,
	action: { payload?: ErrorResponse; error: SerializedError }
) => {
	Object.assign(state, {
		status: API_STATUS.REJECTED,
		loading: false,
		error: {
			message: action.payload?.message,
			reasons: action.payload?.reasons,
		},
		isUserLoggedIn: false,
	})
	localStorage.removeItem('isUserLoggedIn')
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logoutUser: (state) => {
			Object.assign(state, {
				isUserLoggedIn: false,
				error: null,
			})
			localStorage.removeItem('isUserLoggedIn')
		},
		loginUser: (state) => {
			Object.assign(state, {
				isUserLoggedIn: true,
				error: null,
			})
			localStorage.setItem('isUserLoggedIn', 'true')
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(oauthGoogleAction.pending, handlePending)
			.addCase(oauthGoogleAction.fulfilled, handleFulfilled)
			.addCase(oauthGoogleAction.rejected, handleRejected)

			.addCase(signInAction.pending, handlePending)
			.addCase(signInAction.fulfilled, handleFulfilled)
			.addCase(signInAction.rejected, handleRejected)

			.addCase(signUpAction.pending, handlePending)
			.addCase(signUpAction.fulfilled, handleFulfilled)
			.addCase(signUpAction.rejected, handleRejected)

			.addCase(refreshAction.pending, handlePending)
			.addCase(refreshAction.fulfilled, (state, { payload }) => {
				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					loading: false,
					error: null,
					isUserLoggedIn: true,
				})
				localStorage.setItem('isUserLoggedIn', 'true')
				if (payload?.message) showToast('success', payload.message)
			})
			.addCase(refreshAction.rejected, (state, { payload, meta }) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					loading: false,
					error: {
						message: payload?.message,
						reasons: payload?.reasons,
					},
					isUserLoggedIn: false,
					doNotShowAlert: meta.arg?.doNotShowAlert,
				})
				localStorage.removeItem('isUserLoggedIn')
			})

			.addCase(logoutAction.pending, handlePending)
			.addCase(logoutAction.fulfilled, (state) => {
				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					loading: false,
					error: null,
					isUserLoggedIn: false,
				})
				localStorage.removeItem('isUserLoggedIn')
			})
			.addCase(logoutAction.rejected, handleRejected)
	},
})

const { logoutUser, loginUser } = authSlice.actions

export const loginUserDispatcher = () => {
	appDispatcher(loginUser())
}

export const logoutUserDispatcher = () => {
	appDispatcher(logoutUser())
}

export default authSlice.reducer
