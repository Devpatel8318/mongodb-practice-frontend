import { createSlice } from 'src/deps'
import { fetchQuestionDetailAction } from 'src/features/queryPractice/problemPracticePage.actions'
import { appDispatcher } from 'src/Store'
import { ReducerErrorObject } from 'src/Types/global'
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi'

import { Question } from './dashboard.reducer'

export interface QuestionDetail {
	questionId: number
	question: string
	description: string
	difficulty: Question['difficulty']
	status: Question['status']
	difficultyLabel: Question['difficultyLabel']
	dataBaseSchema: { title: string; schema: object }[]
}

export interface ProblemPracticePageStateType {
	status: API_STATUS_TYPE
	loading: boolean
	error: null | ReducerErrorObject
	data: null | QuestionDetail
	selectedQuestionId: null | number
}

export const initialState: ProblemPracticePageStateType = {
	status: null,
	loading: false,
	error: null,
	data: null,
	selectedQuestionId: null,
}

const problemPracticePageSlice = createSlice({
	name: 'problemPracticePage',
	initialState,
	reducers: {
		setSelectedQuestionId: (state, { payload }) => {
			state.selectedQuestionId = payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchQuestionDetailAction.pending, (state) => {
				Object.assign(state, {
					status: API_STATUS.PENDING,
					loading: true,
					error: null,
					data: null,
				})
			})
			.addCase(
				fetchQuestionDetailAction.fulfilled,
				(state, { payload }) => {
					Object.assign(state, {
						status: API_STATUS.SUCCESS,
						loading: false,
						error: null,
						data: payload.data,
					})
				}
			)
			.addCase(fetchQuestionDetailAction.rejected, (state, action) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					error: action.payload,
					loading: false,
					data: null,
				})
			})
	},
})

const { setSelectedQuestionId } = problemPracticePageSlice.actions

export const setSelectedQuestionIdDispatcher = (questionId: number) => {
	appDispatcher(setSelectedQuestionId(questionId))
}

export default problemPracticePageSlice.reducer
