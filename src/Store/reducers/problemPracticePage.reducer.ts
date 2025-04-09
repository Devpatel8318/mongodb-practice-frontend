import { createSlice } from 'src/deps'
import { API_STATUS_TYPE } from 'src/utils/callApi'
import { ReducerErrorObject } from 'src/Types/global'

export interface ProblemPracticePageStateType {
	status: API_STATUS_TYPE
	error: null | ReducerErrorObject
	loading: boolean
	success: null | boolean
}

export const initialState: ProblemPracticePageStateType = {
	status: null,
	error: null,
	loading: false,
	success: null,
}

const problemPracticePageSlice = createSlice({
	name: 'problemPracticePage',
	initialState,
	reducers: {},
})

export default problemPracticePageSlice.reducer
