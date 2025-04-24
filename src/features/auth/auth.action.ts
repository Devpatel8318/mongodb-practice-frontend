import { createAsyncThunk } from 'src/deps'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'
import { tryCatch } from 'src/utils/tryCatch'

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
	const [data, error] = await tryCatch<SuccessResponse>(
		callApi('/auth/google', 'POST', payload)
	)

	if (error) {
		return rejectWithValue(error)
	}

	return data
})

export const signInAction = createAsyncThunk<
	SuccessResponse,
	{ email: string; password: string },
	{
		rejectValue: ErrorResponse
	}
>('auth/signIn', async (payload, { rejectWithValue }) => {
	const { email, password } = payload

	const [data, error] = await tryCatch<SuccessResponse>(
		callApi('/auth/login', 'POST', {
			email,
			password,
		})
	)

	if (error) {
		return rejectWithValue(error)
	}

	return data
})

export const signUpAction = createAsyncThunk<
	SuccessResponse,
	{ email: string; password: string },
	{
		rejectValue: ErrorResponse
	}
>('auth/signUp', async (payload, { rejectWithValue }) => {
	const { email, password } = payload

	const [data, error] = await tryCatch<SuccessResponse>(
		callApi('/auth/signup', 'POST', {
			email,
			password,
		})
	)
	if (error) {
		return rejectWithValue(error)
	}
	return data
})

export const refreshAction = createAsyncThunk<
	SuccessResponse,
	{ doNotShowAlert: boolean },
	{
		rejectValue: ErrorResponse
	}
>('auth/refresh', async (_payload, { rejectWithValue }) => {
	const [data, error] = await tryCatch<SuccessResponse>(
		callApi('/auth/refresh', 'GET')
	)
	if (error) {
		return rejectWithValue(error)
	}
	return data
})

// this will be used when we need to clear access-token, refresh-token and localStorage
export const logoutAction = createAsyncThunk<
	SuccessResponse,
	void,
	{
		rejectValue: ErrorResponse
	}
>('auth/logout', async (_payload, { rejectWithValue }) => {
	const [data, error] = await tryCatch<SuccessResponse>(
		callApi('/auth/logout', 'GET')
	)
	if (error) {
		return rejectWithValue(error)
	}
	return data
})
