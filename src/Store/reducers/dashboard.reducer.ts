import { createSlice } from '@reduxjs/toolkit';
import { getAllQuestionsAction } from 'src/features/dashboard/dashboard.action';
import { ErrorResponse, SuccessResponse } from 'src/Types/global';
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi';

export type Question = {
    _id: string;
    question: string;
    answer: string;
    questionId: number;
};

export type AllQuestions = {
    list: Question[];
};

export interface UserStateType {
    status: API_STATUS_TYPE;
    data: SuccessResponse<AllQuestions> | null;
    error: ErrorResponse | null;
    questions: Question[] | [];
    loading: boolean;
}

const initialState: UserStateType = {
    status: null,
    data: null,
    error: null,
    questions: [],
    loading: false,
};

const dashBoardSlice = createSlice({
    name: 'dashBoard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllQuestionsAction.pending, (state) => {
                state.status = API_STATUS.PENDING;
                state.data = null;
                state.error = null;
                state.loading = true;
            })
            .addCase(getAllQuestionsAction.fulfilled, (state, { payload }) => {
                console.log({
                    p: payload.response,
                });
                state.status = API_STATUS.SUCCESS;
                state.data = {
                    success: true,
                    message: payload.message,
                    response: payload.response,
                };
                state.error = null;
                state.loading = false;
                state.questions = payload.response?.list ?? [];
            })
            .addCase(getAllQuestionsAction.rejected, (state, { payload }) => {
                state.status = API_STATUS.REJECTED;
                state.data = null;
                state.error = {
                    success: false,
                    message: payload?.message || 'Something Went Wrong!!!',
                    reasons: payload?.reasons || [],
                };
                state.loading = false;
            });
    },
});

export default dashBoardSlice.reducer;
