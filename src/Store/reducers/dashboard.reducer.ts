import { createSlice } from 'src/deps'
import { getAllQuestionsAction } from 'src/features/dashboard/dashboard.action'
import { DifficultyEnum, QuestionProgressEnum } from 'src/Types/enums'
import { FieldError } from 'src/Types/global'
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi'

export type Question = {
	_id: string
	question: string
	answer: string
	questionId: number
	difficulty: DifficultyEnum
	progress: QuestionProgressEnum
}

export interface QuestionsStateType {
	status: null | API_STATUS_TYPE
	data: null | {
		list: Question[]
		total: number
	}
	error: null | FieldError[]
	loading: boolean
}

const initialState: QuestionsStateType = {
	status: null,
	data: null,
	error: null,
	loading: false,
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
					error: null,
					data: [],
					loading: true,
				})
			})
			.addCase(getAllQuestionsAction.fulfilled, (state, { payload }) => {
				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					loading: false,
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
				})
			})
	},
})

export default questionsSlice.reducer
