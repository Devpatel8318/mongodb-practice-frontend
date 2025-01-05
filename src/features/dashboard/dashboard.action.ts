import { createAsyncThunk } from "@reduxjs/toolkit";
import { appDispatcher } from "src/Store";
import { Question } from "src/Store/reducers/dashboard.reducer";
import { ErrorResponse, SuccessResponse } from "src/Types/global";
import callApi from "src/utils/callApi";

export const getAllQuestionsAction = createAsyncThunk<
    SuccessResponse<{ list: Question[] }>,
    void,
    {
        rejectValue: ErrorResponse;
    }
>("dashboard/list", async (_, { rejectWithValue }) => {
    try {
        // TODO: change /admin/list to /user/list
        const data = await callApi<{ list: Question[] }>("/admin/list", "GET");

        return data;
    } catch (e) {
        return rejectWithValue(e as ErrorResponse);
    }
});

export const getAllQuestionsActionDispatcher = () => {
    appDispatcher(getAllQuestionsAction());
};
