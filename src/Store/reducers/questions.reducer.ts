import { createSlice } from 'src/deps'
import { getAllQuestionsAction } from 'src/features/dashboard/dashboard.action'
import {
	fetchQuestionDetailAction,
	fetchSubmissionsAction,
	toggleBookmarkAction,
} from 'src/features/queryPractice/panels/questionPanel/actions/questionPanel.actions'
import { appDispatcher } from 'src/Store'
import {
	DifficultyEnum,
	QuestionProgressEnum,
	SubmissionStatusEnum,
} from 'src/Types/enums'
import { FieldError, ReducerErrorObject } from 'src/Types/global'
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi'

export interface DashboardStateType {
	status: null | API_STATUS_TYPE
	data: null | {
		list: QuestionDetail[]
		total: number
	}
	error: null | FieldError[]
	loading: boolean
}

const dashboardInitialState: DashboardStateType = {
	status: null,
	data: null,
	error: null,
	loading: false,
}

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState: dashboardInitialState,
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

export const dashboard = dashboardSlice.reducer

// *********************** //

export interface QuestionDetail {
	questionId: number
	question: string
	description: string
	difficulty: keyof typeof DifficultyEnum
	progress: keyof typeof QuestionProgressEnum
	dataBaseSchema: { title: string; schema: object }[]
	isBookmarked: boolean
	isSolutionSeen: boolean
	answer?: string
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
		setQuestionStatusAsAttempted: (state) => {
			if (state.data) {
				state.data.progress = QuestionProgressEnum.ATTEMPTED
			}
		},
		setQuestionStatusAsSolved: (state) => {
			if (state.data) {
				state.data.progress = QuestionProgressEnum.SOLVED
			}
		},
		setSolutionSeen: (state) => {
			if (state.data) {
				state.data.isSolutionSeen = true
			}
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

const {
	setSelectedQuestionId,
	setQuestionStatusAsAttempted,
	setQuestionStatusAsSolved,
	setSolutionSeen,
} = questionPanelSlice.actions

export const setSelectedQuestionIdDispatcher = (questionId: number) => {
	appDispatcher(setSelectedQuestionId(questionId))
}
export const setQuestionStatusAsAttemptedDispatcher = () => {
	appDispatcher(setQuestionStatusAsAttempted())
}
export const setQuestionStatusAsSolvedDispatcher = () => {
	appDispatcher(setQuestionStatusAsSolved())
}
export const setSolutionSeenDispatcher = () => {
	appDispatcher(setSolutionSeen())
}

export const questionPanelReducer = questionPanelSlice.reducer

// *********************** //

export interface Submission {
	submissionId: string
	userId: number
	questionId: number
	query: string
	submissionStatus: keyof typeof SubmissionStatusEnum
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
					// data: null, // if this is set to null, it will cause UI to show no submissions between fetches (experimental, might delete later)
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
