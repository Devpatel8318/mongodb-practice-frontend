import { createSlice } from 'src/deps'
import {
	fetchQuestionDetailAction,
	fetchSubmissionsAction,
	toggleBookmarkAction,
} from 'src/features/queryPractice/panels/questionPanel/actions/questionPanel.actions'
import { appDispatcher } from 'src/Store'
import {
	DifficultyEnum,
	QuestionStatusEnum,
	SubmissionStatusEnum,
} from 'src/Types/enums'
import { ReducerErrorObject } from 'src/Types/global'
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi'

export interface QuestionDetail {
	questionId: number
	question: string
	description: string
	difficulty: DifficultyEnum
	status: QuestionStatusEnum
	dataBaseSchema: { title: string; schema: object }[]
	isBookmarked: boolean
}

export interface QuestionPanelStateType {
	status: API_STATUS_TYPE
	loading: boolean
	error: null | ReducerErrorObject
	data: null | QuestionDetail
	selectedQuestionId: null | number
}

export const questionPanelInitialState: QuestionPanelStateType = {
	status: null,
	loading: false,
	error: null,
	data: null,
	selectedQuestionId: null,
}

const questionPanelSlice = createSlice({
	name: 'questionPanel',
	initialState: questionPanelInitialState,
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
			.addCase(toggleBookmarkAction.pending, (state) => {
				Object.assign(state, {
					// status: API_STATUS.PENDING,
					// loading: true,
					// error: null,
					// data: null,
				})
			})
			.addCase(toggleBookmarkAction.fulfilled, (state, { payload }) => {
				Object.assign(state, {
					// status: API_STATUS.SUCCESS,
					// loading: false,
					// error: null,
					...(state.selectedQuestionId ===
						payload.data?.questionId && {
						data: {
							...state.data,
							isBookmarked: payload.data?.isBookmarked,
						},
					}),
				})
			})
			.addCase(toggleBookmarkAction.rejected, (state) => {
				Object.assign(state, {
					// status: API_STATUS.REJECTED,
					// error: action.payload,
					// loading: false,
					// data: null,
				})
			})
	},
})

const { setSelectedQuestionId } = questionPanelSlice.actions

export const setSelectedQuestionIdDispatcher = (questionId: number) => {
	appDispatcher(setSelectedQuestionId(questionId))
}

export const questionPanelReducer = questionPanelSlice.reducer

// *********************** //

export interface Submission {
	submissionId: string
	userId: number
	questionId: number
	query: string
	status: SubmissionStatusEnum
	createdAt: number
}

export interface SubmissionsStateType {
	status: API_STATUS_TYPE
	loading: boolean
	error: null | ReducerErrorObject
	data: null | { questionId: number; list: Submission[] }
}

export const submissionsInitialState: SubmissionsStateType = {
	status: null,
	loading: false,
	error: null,
	data: null,
}

const submissionsSlice = createSlice({
	name: 'submissions',
	initialState: submissionsInitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSubmissionsAction.pending, (state) => {
				Object.assign(state, {
					status: API_STATUS.PENDING,
					loading: true,
					error: null,
					data: null,
				})
			})
			.addCase(fetchSubmissionsAction.fulfilled, (state, { payload }) => {
				Object.assign(state, {
					status: API_STATUS.SUCCESS,
					loading: false,
					error: null,
					data: payload.data,
				})
			})
			.addCase(fetchSubmissionsAction.rejected, (state, action) => {
				Object.assign(state, {
					status: API_STATUS.REJECTED,
					error: action.payload,
					loading: false,
					data: null,
				})
			})
	},
})

export const submissionsReducer = submissionsSlice.reducer
