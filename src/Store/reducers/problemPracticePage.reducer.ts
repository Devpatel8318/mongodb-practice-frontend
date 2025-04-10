import { createSlice } from 'src/deps'
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi'
import { ReducerErrorObject } from 'src/Types/global'
import {
	evaluateAnswerAction,
	submitAnswerAction,
} from 'src/features/queryPractice/problemPracticePage.actions'

export interface EvaluateResultResponse {
	questionId: number
	correct: boolean
	result: object
}

export interface ProblemPracticePageStateType {
	status: API_STATUS_TYPE
	loading: boolean
	error: null | ReducerErrorObject
	data: null | EvaluateResultResponse
	submissionFlowLoading: boolean
}

export const initialState: ProblemPracticePageStateType = {
	status: null,
	loading: false,
	error: null,
	data: null,
	submissionFlowLoading: false,
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
					submissionFlowLoading: true,
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
					submissionFlowLoading: false,
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
					submissionFlowLoading: false,
				})
			})
			.addCase(evaluateAnswerAction.rejected, (state, action) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					error: action.payload,
					loading: false,
					data: null,
					submissionFlowLoading: false,
				})
			})
	},
})

export default problemPracticePageSlice.reducer
