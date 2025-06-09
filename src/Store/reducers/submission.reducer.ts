import { createSlice } from 'src/deps'
import {
	evaluateAnswerAction,
	runAnswerAction,
	runOnlyRetrieveDataAction,
	submitAnswerAction,
} from 'src/features/queryPractice/panels/submissionPanel/submission.actions'
import { ReducerErrorObject } from 'src/Types/global'
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi'

export interface EvaluateResultResponse {
	questionId: number
	correct?: boolean
	expected?: object
	output?: object
	pending?: boolean
}

export interface RunOnlyRetrieveDataResponse {
	questionId: number
	output: string
	isRunOnly: boolean
}

export interface SubmissionStateType {
	status: API_STATUS_TYPE
	error: null | ReducerErrorObject
	data: null | EvaluateResultResponse | RunOnlyRetrieveDataResponse
	submissionFlowLoading: boolean
}

export const initialState: SubmissionStateType = {
	status: null,
	error: null,
	data: null,
	submissionFlowLoading: false,
}

const submissionSlice = createSlice({
	name: 'submission',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(submitAnswerAction.pending, (state) => {
				Object.assign(state, initialState)
			})
			.addCase(submitAnswerAction.fulfilled, (state, { payload }) => {
				const { pending } = payload.data || {}

				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					error: null,
					data: payload.data,
					submissionFlowLoading: !!pending,
				})
			})
			.addCase(submitAnswerAction.rejected, (state, action) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					error: action.payload,
					submissionFlowLoading: false,
				})
			})
			.addCase(runAnswerAction.pending, (state) => {
				Object.assign(state, {
					status: API_STATUS.PENDING,
					error: null,
					submissionFlowLoading: true,
				})
			})
			.addCase(runAnswerAction.fulfilled, (state, { payload }) => {
				const { pending } = payload.data || {}

				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					error: null,
					data: payload.data,
					submissionFlowLoading: !!pending,
				})
			})
			.addCase(runAnswerAction.rejected, (state, action) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					error: action.payload,
					submissionFlowLoading: false,
				})
			})
			.addCase(evaluateAnswerAction.pending, (state) => {
				Object.assign(state, {
					status: API_STATUS.PENDING,
					error: null,
					data: null,
				})
			})
			.addCase(evaluateAnswerAction.fulfilled, (state, { payload }) => {
				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					error: null,
					data: payload.data,
					submissionFlowLoading: false,
				})
			})
			.addCase(evaluateAnswerAction.rejected, (state, action) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					error: action.payload,
					data: null,
					submissionFlowLoading: false,
				})
			})
			.addCase(runOnlyRetrieveDataAction.pending, (state) => {
				Object.assign(state, {
					status: API_STATUS.PENDING,
					error: null,
					data: null,
				})
			})
			.addCase(
				runOnlyRetrieveDataAction.fulfilled,
				(state, { payload }) => {
					Object.assign(state, {
						status: API_STATUS.SUCCESS,
						error: null,
						data: payload.data,
						submissionFlowLoading: false,
					})
				}
			)
			.addCase(runOnlyRetrieveDataAction.rejected, (state, action) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					error: action.payload,
					data: null,
					submissionFlowLoading: false,
				})
			})
	},
})

export default submissionSlice.reducer
