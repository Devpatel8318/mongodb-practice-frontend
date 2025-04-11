import { createAsyncThunk } from 'src/deps'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'

export type GoogleAuthPayload =
	| { code: string; credential?: never }
	| { credential: string; code?: never }

export const oauthGoogleAction = createAsyncThunk<
	SuccessResponse,
	GoogleAuthPayload,
	{
		rejectValue: ErrorResponse
	}
>('auth/oauthGoogle', async (payload, { rejectWithValue }) => {
	try {
		const { code, credential } = payload
		return await callApi('/auth/google', 'POST', { code, credential })
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})

export const signInAction = createAsyncThunk<
	SuccessResponse,
	{ email: string; password: string },
	{
		rejectValue: ErrorResponse
	}
>('auth/signIn', async (payload, { rejectWithValue }) => {
	const { email, password } = payload
	try {
		return await callApi('/auth/login', 'POST', {
			email,
			password,
		})
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})

export const signUpAction = createAsyncThunk<
	SuccessResponse,
	{ email: string; password: string },
	{
		rejectValue: ErrorResponse
	}
>('auth/signUp', async (payload, { rejectWithValue }) => {
	const { email, password } = payload
	try {
		return await callApi('/auth/signup', 'POST', {
			email,
			password,
		})
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})

export const refreshAction = createAsyncThunk<
	SuccessResponse,
	{ doNotShowAlert: boolean },
	{
		rejectValue: ErrorResponse
	}
>('auth/refresh', async (_payload, { rejectWithValue }) => {
	try {
		return await callApi('/auth/refresh', 'GET')
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})

// this will be used when we need to clear access-token, refresh-token and localStorage
export const logoutAction = createAsyncThunk<
	SuccessResponse,
	void,
	{
		rejectValue: ErrorResponse
	}
>('auth/logout', async (_payload, { rejectWithValue }) => {
	try {
		return await callApi('/auth/logout', 'GET')
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})
