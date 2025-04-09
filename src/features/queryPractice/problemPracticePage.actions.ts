import { createAsyncThunk } from '@reduxjs/toolkit'
import { appDispatcher } from 'src/Store'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'

export const submitAnswerAction = createAsyncThunk<
	SuccessResponse<{ idk: object }>,
	{ questionId: number; answer: string },
	{
		rejectValue: ErrorResponse
	}
>('problemPracticePage/submit', async (payload, { rejectWithValue }) => {
	const { questionId, answer } = payload
	try {
		return await callApi(`/answer/submit/${questionId}`, 'POST', {
			answerQuery: answer,
		})
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})

export const submitAnswerActionDispatcher = (payload: {
	questionId: number
	answer: string
}) => {
	appDispatcher(submitAnswerAction(payload))
}
