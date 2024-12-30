import { createAsyncThunk } from '@reduxjs/toolkit';
import { appDispatcher } from 'src/Store';
import { AllQuestions } from 'src/Store/reducers/dashboard.reducer';
import { ErrorResponse, SuccessResponse } from 'src/Types/global';
import callApi from 'src/utils/callApi';

export const getAllQuestionsAction = createAsyncThunk<
    SuccessResponse<AllQuestions>,
    void,
    {
        rejectValue: ErrorResponse;
    }
>('dashboard/list', async (_, { rejectWithValue }) => {
    try {
        const data = await callApi<AllQuestions>('/admin/list', 'GET');

        return data;
    } catch (e) {
        return rejectWithValue(e as ErrorResponse);
    }
});

export const getAllQuestionsActionDispatcher = () => {
    appDispatcher(getAllQuestionsAction());
};
