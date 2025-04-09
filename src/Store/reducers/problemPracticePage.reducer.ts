import { createSlice } from 'src/deps'
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi'
import { ReducerErrorObject } from 'src/Types/global'
import {
	evaluateAnswerAction,
	submitAnswerAction,
} from 'src/features/queryPractice/problemPracticePage.actions'

export interface ProblemPracticePageStateType {
	status: API_STATUS_TYPE
	loading: boolean
	error: null | ReducerErrorObject
	data: null | object
	submissionLoading: boolean
}

export const initialState: ProblemPracticePageStateType = {
	status: null,
	loading: false,
	error: null,
	data: null,
	submissionLoading: false,
}

const problemPracticePageSlice = createSlice({
	name: 'problemPracticePage',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(submitAnswerAction.pending, (state) => {
				Object.assign(state, {
					status: API_STATUS.PENDING,
					loading: true,
					error: null,
					data: null,
					submissionLoading: true,
				})
			})
			.addCase(submitAnswerAction.fulfilled, (state, { payload }) => {
				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					loading: false,
					error: null,
					data: payload.data,
				})
			})
			.addCase(submitAnswerAction.rejected, (state, action) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					error: action.payload,
					loading: false,
					data: null,
					submissionLoading: false,
				})
			})
			.addCase(evaluateAnswerAction.pending, (state) => {
				Object.assign(state, {
					status: API_STATUS.PENDING,
					loading: true,
					error: null,
					data: null,
				})
			})
			.addCase(evaluateAnswerAction.fulfilled, (state, { payload }) => {
				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					loading: false,
					error: null,
					data: payload.data,
					submissionLoading: false,
				})
			})
			.addCase(evaluateAnswerAction.rejected, (state, action) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					error: action.payload,
					loading: false,
					data: null,
					submissionLoading: false,
				})
			})
	},
})

export default problemPracticePageSlice.reducer
