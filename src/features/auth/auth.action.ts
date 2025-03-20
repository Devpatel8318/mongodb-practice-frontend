import { createAsyncThunk } from "@reduxjs/toolkit";
import { appDispatcher } from "src/Store";
import { ErrorResponse, SuccessResponse } from "src/Types/global";
import callApi from "src/utils/callApi";

export const signInAction = createAsyncThunk<
    SuccessResponse,
    { email: string; password: string },
    {
        rejectValue: ErrorResponse;
    }
>("auth/signIn", async (payload, { rejectWithValue }) => {
    const { email, password } = payload;
    try {
        return await callApi(
            "/user/login",
            "POST",
            {
                email,
                password,
            },
            true,
        );
    } catch (e) {
        return rejectWithValue(e as ErrorResponse);
    }
});

export const signInActionDispatcher = (payload: {
    email: string;
    password: string;
}) => {
    appDispatcher(signInAction(payload));
};

export const refreshAction = createAsyncThunk<
    SuccessResponse,
    {
        showAlertMessage?: boolean;
    },
    {
        rejectValue: ErrorResponse;
    }
>("auth/refresh", async (_payload, { rejectWithValue }) => {
    try {
        return await callApi("/user/me", "GET");
    } catch (e) {
        return rejectWithValue(e as ErrorResponse);
    }
});

export const refreshActionDispatcher = () => {
    appDispatcher(refreshAction({ showAlertMessage: false }));
};

// this will be used when we need to clear access-token, refresh-token and localStorage
export const logoutAction = createAsyncThunk<
    SuccessResponse,
    void,
    {
        rejectValue: ErrorResponse;
    }
>("auth/logout", async (_payload, { rejectWithValue }) => {
    try {
        return await callApi("/user/logout", "GET");
    } catch (e) {
        return rejectWithValue(e as ErrorResponse);
    }
});

export const logoutActionDispatcher = () => {
    appDispatcher(logoutAction());
};
