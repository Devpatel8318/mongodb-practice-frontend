import { createAsyncThunk } from '@reduxjs/toolkit'
import { appDispatcher } from 'src/Store'
import {
	EvaluateResultResponse,
	RunOnlyRetrieveDataResponse,
} from 'src/Store/reducers/submission.reducer'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'

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
	try {
		return await callApi(`/answer/submit/${questionId}`, 'POST', {
			answerQuery: answer,
			socketId,
		})
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
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
	try {
		return await callApi(`/answer/run/${questionId}`, 'POST', {
			answerQuery: answer,
			socketId,
		})
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})

export const runAnswerActionDispatcher = (payload: {
	questionId: number
	answer: string
	socketId: string
}) => {
	console.log('selectedQuestionId', payload.questionId)
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
	try {
		return await callApi(`/answer/evaluate/${questionId}`, 'POST', {
			question,
			answer,
			submissionId,
		})
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
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
	try {
		return await callApi(`/answer/runonly/retrieve/${questionId}`, 'POST', {
			answer,
		})
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})

export const runOnlyRetrieveDataActionDispatcher = (payload: {
	questionId: number
	answer: string
}) => {
	appDispatcher(runOnlyRetrieveDataAction(payload))
}
