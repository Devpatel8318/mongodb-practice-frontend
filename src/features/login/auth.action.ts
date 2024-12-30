import { createAsyncThunk } from '@reduxjs/toolkit';
import { appDispatcher } from 'src/Store';
import { ErrorResponse, SuccessResponse } from 'src/Types/global';
import callApi from 'src/utils/callApi';

export const signInAction = createAsyncThunk<
    SuccessResponse,
    { email: string; password: string },
    {
        rejectValue: ErrorResponse;
    }
>('auth/signIn', async (payload, { rejectWithValue }) => {
    const { email, password } = payload;
    try {
        await callApi(
            '/user/login',
            'POST',
            {
                email,
                password,
            },
            true
        );

        return {
            success: true,
            message: 'Login successful',
        };
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
    void,
    {
        rejectValue: ErrorResponse;
    }
>('auth/refresh', async (payload, { rejectWithValue }) => {
    try {
        await callApi('/user/me', 'GET');
        return {
            success: true,
            message: 'Successfully fetched access token',
        };
    } catch (e) {
        return rejectWithValue(e as ErrorResponse);
    }
});

export const refreshActionDispatcher = () => {
    appDispatcher(refreshAction());
};
