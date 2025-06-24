import { createAsyncThunk } from 'src/deps'
import { appDispatcher } from 'src/Store'
import {
	QuestionDetail,
	Submission,
} from 'src/Store/reducers/questions.reducer'
import { Solution } from 'src/Store/reducers/solution.reducer'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'
import { tryCatch } from 'src/utils/tryCatch'

export const fetchQuestionDetailAction = createAsyncThunk<
	SuccessResponse<QuestionDetail>,
	number,
	{
		rejectValue: ErrorResponse
	}
>('questionPanel/questionDetail', async (questionId, { rejectWithValue }) => {
	const [data, error] = await tryCatch<SuccessResponse<QuestionDetail>>(
		callApi(`/question/view/${questionId}`, 'GET')
	)
	if (error) {
		return rejectWithValue(error)
	}
	return data
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
	const [data, error] = await tryCatch<
		SuccessResponse<{ questionId: number; isBookmarked: boolean }>
	>(callApi(`/question/bookmark/${questionId}`, 'POST'))

	if (error) {
		return rejectWithValue(error)
	}
	return data
})

export const toggleBookmarkActionDispatcher = (questionId: number) => {
	appDispatcher(toggleBookmarkAction(questionId))
}

export const fetchSubmissionsAction = createAsyncThunk<
	SuccessResponse<{ questionId: number; list: Submission[] }>,
	number,
	{
		rejectValue: ErrorResponse
	}
>('questionPanel/submissions', async (questionId, { rejectWithValue }) => {
	const [data, error] = await tryCatch<
		SuccessResponse<{ questionId: number; list: Submission[] }>
	>(callApi(`/answer/submissions/${questionId}`, 'GET'))
	if (error) {
		return rejectWithValue(error)
	}
	return data
})
export const fetchSubmissionsActionDispatcher = (questionId: number) => {
	appDispatcher(fetchSubmissionsAction(questionId))
}

export const fetchSolutionAction = createAsyncThunk<
	SuccessResponse<Solution>,
	number,
	{
		rejectValue: ErrorResponse
	}
>('questionPanel/solution', async (questionId, { rejectWithValue }) => {
	const [data, error] = await tryCatch<SuccessResponse<Solution>>(
		callApi(`/question/solution/${questionId}`, 'GET')
	)
	if (error) {
		return rejectWithValue(error)
	}
	return data
})
export const fetchSolutionActionDispatcher = (questionId: number) => {
	appDispatcher(fetchSolutionAction(questionId))
}
