import { createSlice } from 'src/deps'
import { ReducerErrorObject } from 'src/Types/global'
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi'
import { userSettingAction } from '../globalActions/user.action'

export interface UserStateType {
	status: API_STATUS_TYPE
	error: null | ReducerErrorObject
	loading: boolean
	profilePictureUrl?: null | string
	email?: null | string
}

const initialState: UserStateType = {
	status: null,
	error: null,
	loading: false,
	profilePictureUrl: null,
	email: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(userSettingAction.pending, (state) => {
				Object.assign(state, {
					status: API_STATUS.PENDING,
					error: null,
					loading: true,
				})
			})
			.addCase(userSettingAction.fulfilled, (state, { payload }) => {
				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					loading: false,
					error: null,
					isUserLoggedIn: true,
					profilePictureUrl: payload.data?.profilePictureUrl,
					email: payload.data?.email,
				})
			})
			.addCase(userSettingAction.rejected, (state, action) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					error: action.payload,
					loading: false,
					isUserLoggedIn: false,
				})
			})
	},
})

export default userSlice.reducer
