import { createAsyncThunk } from 'src/deps'
import { appDispatcher } from 'src/Store'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'

export const userSettingAction = createAsyncThunk<
	SuccessResponse<{ email: string; profilePictureUrl: string }>,
	void,
	{
		rejectValue: ErrorResponse
	}
>('user/setting', async (payload, { rejectWithValue }) => {
	try {
		return await callApi('/user/setting', 'GET')
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})

export const userSettingActionDispatcher = () => {
	appDispatcher(userSettingAction())
}
