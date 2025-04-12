import { createAsyncThunk } from 'src/deps'
import { appDispatcher } from 'src/Store'
import { Question } from 'src/Store/reducers/dashboard.reducer'
import { ErrorResponse, SuccessResponse } from 'src/Types/global'
import callApi from 'src/utils/callApi'

export const getAllQuestionsAction = createAsyncThunk<
	SuccessResponse<{ list: Question[]; total: number }>,
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

	try {
		const data = await callApi<{ list: Question[]; total: number }>(
			url,
			'GET'
		)

		return data
	} catch (e) {
		return rejectWithValue(e as ErrorResponse)
	}
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
