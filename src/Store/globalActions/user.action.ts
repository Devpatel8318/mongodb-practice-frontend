import { createAsyncThunk } from 'src/deps'
import { appDispatcher } from 'src/Store'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'
import { tryCatch } from 'src/utils/tryCatch'

type UserSettingSuccessResponse = SuccessResponse<{
	userId: number
	email: string
	profilePictureUrl: string
}>

export const userSettingAction = createAsyncThunk<
	UserSettingSuccessResponse,
	void,
	{
		rejectValue: ErrorResponse
	}
>('user/setting', async (_, { rejectWithValue }) => {
	const [data, error] = await tryCatch<UserSettingSuccessResponse>(
		callApi('/user/setting', 'GET')
	)

	if (error) {
		return rejectWithValue(error)
	}

	return data
})

export const userSettingActionDispatcher = () => {
	appDispatcher(userSettingAction())
}
