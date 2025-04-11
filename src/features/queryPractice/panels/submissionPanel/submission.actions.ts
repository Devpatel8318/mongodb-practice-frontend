import { createAsyncThunk } from '@reduxjs/toolkit'
import { appDispatcher } from 'src/Store'
import { EvaluateResultResponse } from 'src/Store/reducers/submission.reducer'
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
>('problemPracticePage/submit', async (payload, { rejectWithValue }) => {
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

export const evaluateAnswerAction = createAsyncThunk<
	SuccessResponse<EvaluateResultResponse>,
	{ questionId: number; question: string; answer: string },
	{
		rejectValue: ErrorResponse
	}
>('problemPracticePage/evaluate', async (payload, { rejectWithValue }) => {
	const { questionId, question, answer } = payload
	try {
		return await callApi(`/answer/evaluate/${questionId}`, 'POST', {
			question,
			answer,
		})
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})

export const evaluateAnswerDispatcher = (payload: {
	questionId: number
	question: string
	answer: string
}) => {
	appDispatcher(evaluateAnswerAction(payload))
}
