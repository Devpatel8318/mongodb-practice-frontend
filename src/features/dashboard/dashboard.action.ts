import { createAsyncThunk } from 'src/deps'
import { appDispatcher } from 'src/Store'
import { QuestionDetail } from 'src/Store/reducers/questions.reducer'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'
import { tryCatch } from 'src/utils/tryCatch'

export const getAllQuestionsAction = createAsyncThunk<
	SuccessResponse<{ list: QuestionDetail[]; total: number }>,
	{
		page?: number
		limit?: number
		filterQuery?: string
		sortQuery?: string
		searchQuery?: string
		showOnlyBookmarked?: boolean
	},
	{
		rejectValue: ErrorResponse
	}
>('questions/list', async (payload, { rejectWithValue }) => {
	const {
		page = 1,
		limit = 20,
		filterQuery = '',
		sortQuery = '',
		searchQuery = '',
		showOnlyBookmarked = false,
	} = payload

	let url = `/question/list?page=${page}&limit=${limit}`
	if (filterQuery) {
		url += `&${filterQuery}`
	}

	if (sortQuery) {
		url += `&${sortQuery}`
	}

	if (searchQuery) {
		url += `&${searchQuery}`
	}

	if (showOnlyBookmarked) {
		url += `&onlyBookmarked=true`
	}

	const [data, error] = await tryCatch<
		SuccessResponse<{ list: QuestionDetail[]; total: number }>
	>(callApi(url, 'GET'))
	if (error) {
		return rejectWithValue(error)
	}
	return data
})

export const getAllQuestionsActionDispatcher = ({
	page,
	limit,
	filterQuery,
	sortQuery,
	searchQuery,
	showOnlyBookmarked,
}: {
	page?: number
	limit?: number
	filterQuery?: string
	sortQuery?: string
	searchQuery?: string
	showOnlyBookmarked?: boolean
}) => {
	appDispatcher(
		getAllQuestionsAction({
			page,
			limit,
			filterQuery,
			sortQuery,
			searchQuery,
			showOnlyBookmarked,
		})
	)
}
