import { createSlice } from 'src/deps'
import { fetchSolutionAction } from 'src/features/queryPractice/panels/questionPanel/actions/questionPanel.actions'
import { ReducerErrorObject } from 'src/Types/global'
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi'

export interface SolutionResponse {
	questionId: number
	answer: string
}

export interface SolutionStateType {
	status: API_STATUS_TYPE
	error: null | ReducerErrorObject
	loading: boolean
	data: null | SolutionResponse
}

export const initialState: SolutionStateType = {
	status: null,
	error: null,
	loading: false,
	data: null,
}

const solutionSlice = createSlice({
	name: 'solution',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSolutionAction.pending, (state) => {
				Object.assign(state, {
					status: API_STATUS.PENDING,
					error: null,
					data: null,
					loading: true,
				})
			})
			.addCase(fetchSolutionAction.fulfilled, (state, { payload }) => {
				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					loading: false,
					error: null,
					data: payload.data,
				})
			})
			.addCase(fetchSolutionAction.rejected, (state, action) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					error: action.payload,
					loading: false,
					data: null,
				})
			})
	},
})

export default solutionSlice.reducer
