import { createAsyncThunk } from "@reduxjs/toolkit";
import { appDispatcher } from "src/Store";
import { Question } from "src/Store/reducers/dashboard.reducer";
import { ErrorResponse, SuccessResponse } from "src/Types/global";
import callApi from "src/utils/callApi";

export const getAllQuestionsAction = createAsyncThunk<
    SuccessResponse<{ list: Question[]; total: number }>,
    { page?: number; limit?: number; searchQuery?: string; sortQuery?: string },
    {
        rejectValue: ErrorResponse;
    }
>("questions/list", async (payload, { rejectWithValue }) => {
    const { page = 1, limit = 20, searchQuery = "", sortQuery = "" } = payload;

    let url = `/user/list?page=${page}&limit=${limit}`;
    if (searchQuery) {
        url += `&${searchQuery}`;
    }

    if (sortQuery) {
        url += `&${sortQuery}`;
    }

    try {
        const data = await callApi<{ list: Question[]; total: number }>(
            url,
            "GET",
        );

        return data;
    } catch (e) {
        return rejectWithValue(e as ErrorResponse);
    }
});

export const getAllQuestionsActionDispatcher = ({
    page,
    limit,
    searchQuery,
    sortQuery,
}: {
    page?: number;
    limit?: number;
    searchQuery?: string;
    sortQuery?: string;
}) => {
    appDispatcher(
        getAllQuestionsAction({ page, limit, searchQuery, sortQuery }),
    );
};
