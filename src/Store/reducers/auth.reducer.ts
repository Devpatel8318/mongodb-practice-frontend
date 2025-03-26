import { createSlice } from 'src/deps';
import {
    logoutAction,
    oauthGoogleAction,
    refreshAction,
    signInAction,
    signUpAction,
} from 'src/features/auth/auth.action';
import { ReducerErrorObject, ErrorResponse } from 'src/Types/global';
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi';
import { appDispatcher } from 'src/Store';
import showToast from 'src/utils/showToast';
import { SerializedError } from '@reduxjs/toolkit';

export interface AuthStateType {
    status: API_STATUS_TYPE;
    success: null | boolean;
    error: null | ReducerErrorObject;
    loading: boolean;
    isUserLoggedIn: boolean;
}

export const initialState: AuthStateType = {
    status: null,
    success: null,
    error: null,
    loading: false,
    isUserLoggedIn: false,
};

const handlePending = (state: AuthStateType) => {
    Object.assign(state, {
        status: API_STATUS.PENDING,
        loading: true,
        success: null,
        error: null,
    });
};

const handleFulfilled = (
    state: AuthStateType,
    action: { payload?: ErrorResponse }
) => {
    const { payload } = action;
    Object.assign(state, {
        status: API_STATUS.SUCCESS,
        loading: false,
        success: true,
        error: null,
        isUserLoggedIn: true,
    });
    localStorage.setItem('isUserLoggedIn', 'true');
    if (payload?.message) showToast('success', payload.message);
};

const handleRejected = (
    state: AuthStateType,
    action: { payload?: ErrorResponse; error: SerializedError }
) => {
    Object.assign(state, {
        status: API_STATUS.REJECTED,
        loading: false,
        success: false,
        error: {
            message: action.payload?.message,
            reasons: action.payload?.reasons,
        },
        isUserLoggedIn: false,
    });
    localStorage.removeItem('isUserLoggedIn');
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            Object.assign(state, {
                isUserLoggedIn: false,
                error: null,
            });
            localStorage.removeItem('isUserLoggedIn');
        },
        loginUser: (state) => {
            Object.assign(state, {
                isUserLoggedIn: true,
                error: null,
            });
            localStorage.setItem('isUserLoggedIn', 'true');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(oauthGoogleAction.pending, handlePending)
            .addCase(oauthGoogleAction.fulfilled, handleFulfilled)
            .addCase(oauthGoogleAction.rejected, handleRejected)

            .addCase(signInAction.pending, handlePending)
            .addCase(signInAction.fulfilled, handleFulfilled)
            .addCase(signInAction.rejected, handleRejected)

            .addCase(signUpAction.pending, handlePending)
            .addCase(signUpAction.fulfilled, handleFulfilled)
            .addCase(signUpAction.rejected, handleRejected)

            .addCase(refreshAction.pending, handlePending)
            .addCase(refreshAction.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.SUCCESS,
                    loading: false,
                    success: payload.success,
                    error: null,
                    isUserLoggedIn: true,
                });
                localStorage.setItem('isUserLoggedIn', 'true');
                if (payload?.message) showToast('success', payload.message);
            })
            .addCase(refreshAction.rejected, handleRejected)

            .addCase(logoutAction.pending, handlePending)
            .addCase(logoutAction.fulfilled, (state) => {
                Object.assign(state, {
                    status: API_STATUS.SUCCESS,
                    loading: false,
                    success: true,
                    error: null,
                    isUserLoggedIn: false,
                });
                localStorage.removeItem('isUserLoggedIn');
            })
            .addCase(logoutAction.rejected, handleRejected);
    },
});

const { logoutUser, loginUser } = authSlice.actions;

export const loginUserDispatcher = () => {
    appDispatcher(loginUser());
};

export const logoutUserDispatcher = () => {
    appDispatcher(logoutUser());
};

export default authSlice.reducer;
