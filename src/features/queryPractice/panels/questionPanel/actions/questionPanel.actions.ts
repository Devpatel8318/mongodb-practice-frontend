import { createAsyncThunk } from '@reduxjs/toolkit'
import { appDispatcher } from 'src/Store'
import {
	QuestionDetail,
	Submission,
} from 'src/Store/reducers/questionPanel.reducer'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'

export const fetchQuestionDetailAction = createAsyncThunk<
	SuccessResponse<QuestionDetail>,
	number,
	{
		rejectValue: ErrorResponse
	}
>('questionPanel/questionDetail', async (questionId, { rejectWithValue }) => {
	try {
		return await callApi(`/question/view/${questionId}`, 'GET')
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})
export const fetchQuestionDetailActionDispatcher = (questionId: number) => {
	appDispatcher(fetchQuestionDetailAction(questionId))
}

export const toggleBookmarkAction = createAsyncThunk<
	SuccessResponse<{ questionId: number; isBookmarked: boolean }>,
	number,
	{
		rejectValue: ErrorResponse
	}
>('questionPanel/bookmark', async (questionId, { rejectWithValue }) => {
	try {
		return await callApi(`/question/bookmark/${questionId}`, 'GET')
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})

export const toggleBookmarkActionDispatcher = (questionId: number) => {
	appDispatcher(toggleBookmarkAction(questionId))
}

export const fetchSubmissionsAction = createAsyncThunk<
	SuccessResponse<Submission[]>,
	number,
	{
		rejectValue: ErrorResponse
	}
>('questionPanel/submissions', async (questionId, { rejectWithValue }) => {
	try {
		return await callApi(`/answer/submissions/${questionId}`, 'GET')
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
})
export const fetchSubmissionsActionDispatcher = (questionId: number) => {
	appDispatcher(fetchSubmissionsAction(questionId))
}
