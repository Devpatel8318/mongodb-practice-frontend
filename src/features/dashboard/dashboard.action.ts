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
}: {
	page?: number
	limit?: number
	filterQuery?: string
	sortQuery?: string
	searchQuery?: string
}) => {
	appDispatcher(
		getAllQuestionsAction({
			page,
			limit,
			filterQuery,
			sortQuery,
			searchQuery,
		})
	)
}
