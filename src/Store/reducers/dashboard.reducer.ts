import { createSlice } from 'src/deps'

import { getAllQuestionsAction } from 'src/features/dashboard/dashboard.action'
import { FieldError } from 'src/Types/global'
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi'

export type Question = {
	_id: string
	question: string
	answer: string
	questionId: number
	difficulty: number
	difficultyLabel: 'Easy' | 'Medium' | 'Hard'
	status: 'TODO' | 'SOLVED' | 'ATTEMPTED'
}

export interface QuestionsStateType {
	status: null | API_STATUS_TYPE
	data: null | {
		list: Question[]
		total: number
	}
	error: null | FieldError[]
	loading: boolean
	success: null | boolean
}

const initialState: QuestionsStateType = {
	status: null,
	data: null,
	error: null,
	loading: false,
	success: null,
}

const questionsSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllQuestionsAction.pending, (state) => {
				Object.assign(state, {
					status: API_STATUS.PENDING,
					data: [],
					error: null,
					loading: true,
					success: null,
				})
			})
			.addCase(getAllQuestionsAction.fulfilled, (state, { payload }) => {
				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					loading: false,
					success: payload.success,
					data: payload.data,
					error: null,
				})
			})
			.addCase(getAllQuestionsAction.rejected, (state, { payload }) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					data: [],
					error: {
						message: payload?.message,
						reasons: payload?.reasons,
					},
					loading: false,
					success: false,
				})
			})
	},
})

export default questionsSlice.reducer
