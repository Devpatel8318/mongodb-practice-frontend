import { createAsyncThunk } from '@reduxjs/toolkit'
import { appDispatcher } from 'src/Store'
import {
	EvaluateResultResponse,
	RunOnlyRetrieveDataResponse,
} from 'src/Store/reducers/submission.reducer'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'
import { tryCatch } from 'src/utils/tryCatch'

export const submitAnswerAction = createAsyncThunk<
	SuccessResponse<{
		questionId: number
		correct?: boolean
		expected?: object
		output?: object
		pending?: boolean
	}>,
	{ questionId: number; answer: string; socketId: string },
	{
		rejectValue: ErrorResponse
	}
>('questionPanel/submit', async (payload, { rejectWithValue }) => {
	const { questionId, answer, socketId } = payload

	const [data, error] = await tryCatch<
		SuccessResponse<{
			questionId: number
			correct?: boolean
			expected?: object
			output?: object
			pending?: boolean
		}>
	>(
		callApi(`/answer/submit/${questionId}`, 'POST', {
			answerQuery: answer,
			socketId,
		})
	)

	if (error) {
		return rejectWithValue(error)
	}

	return data
})

export const submitAnswerActionDispatcher = (payload: {
	questionId: number
	answer: string
	socketId: string
}) => {
	appDispatcher(submitAnswerAction(payload))
}

export const runAnswerAction = createAsyncThunk<
	SuccessResponse<{
		questionId: number
		output?: object
		pending?: boolean
	}>,
	{ questionId: number; answer: string; socketId: string },
	{
		rejectValue: ErrorResponse
	}
>('questionPanel/run', async (payload, { rejectWithValue }) => {
	const { questionId, answer, socketId } = payload

	const [data, error] = await tryCatch<
		SuccessResponse<{
			questionId: number
			output?: object
			pending?: boolean
		}>
	>(
		callApi(`/answer/run/${questionId}`, 'POST', {
			answerQuery: answer,
			socketId,
		})
	)

	if (error) {
		return rejectWithValue(error)
	}
	return data
})

export const runAnswerActionDispatcher = (payload: {
	questionId: number
	answer: string
	socketId: string
}) => {
	appDispatcher(runAnswerAction(payload))
}

export const evaluateAnswerAction = createAsyncThunk<
	SuccessResponse<EvaluateResultResponse>,
	{
		questionId: number
		question: string
		answer: string
		submissionId: string
	},
	{
		rejectValue: ErrorResponse
	}
>('questionPanel/evaluate', async (payload, { rejectWithValue }) => {
	const { questionId, question, answer, submissionId } = payload

	const [data, error] = await tryCatch<
		SuccessResponse<EvaluateResultResponse>
	>(
		callApi(`/answer/evaluate/${questionId}`, 'POST', {
			question,
			answer,
			submissionId,
		})
	)
	if (error) {
		return rejectWithValue(error)
	}
	return data
})

export const evaluateAnswerDispatcher = (payload: {
	questionId: number
	question: string
	answer: string
	submissionId: string
}) => {
	appDispatcher(evaluateAnswerAction(payload))
}

export const runOnlyRetrieveDataAction = createAsyncThunk<
	SuccessResponse<RunOnlyRetrieveDataResponse>,
	{
		questionId: number
		answer: string
	},
	{
		rejectValue: ErrorResponse
	}
>('questionPanel/runonly', async (payload, { rejectWithValue }) => {
	const { questionId, answer } = payload

	const [data, error] = await tryCatch<
		SuccessResponse<RunOnlyRetrieveDataResponse>
	>(
		callApi(`/answer/runonly/retrieve/${questionId}`, 'POST', {
			answer,
		})
	)
	if (error) {
		return rejectWithValue(error)
	}
	return data
})

export const runOnlyRetrieveDataActionDispatcher = (payload: {
	questionId: number
	answer: string
}) => {
	appDispatcher(runOnlyRetrieveDataAction(payload))
}
