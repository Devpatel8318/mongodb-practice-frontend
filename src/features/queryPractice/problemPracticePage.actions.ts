import { createAsyncThunk } from '@reduxjs/toolkit'
import { appDispatcher } from 'src/Store'
import { QuestionDetail } from 'src/Store/reducers/problemPracticePage.reducer'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'

export const fetchQuestionDetailAction = createAsyncThunk<
	SuccessResponse<QuestionDetail>,
	number,
	{
		rejectValue: ErrorResponse
	}
>(
	'problemPracticePage/questionDetail',
	async (questionId, { rejectWithValue }) => {
		try {
			return await callApi(`/question/view/${questionId}`, 'GET')
		} catch (e) {
			return rejectWithValue(e as ErrorResponse)
		}
	}
)

export const fetchQuestionDetailActionDispatcher = (questionId: number) => {
	appDispatcher(fetchQuestionDetailAction(questionId))
}
