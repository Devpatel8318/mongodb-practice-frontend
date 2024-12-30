import { createSlice } from '@reduxjs/toolkit';
import {
    signInAction,
    refreshAction,
    logoutAction,
} from 'src/features/auth/auth.action';
import { ReducerErrorObject } from 'src/Types/global';
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi';

export interface UserStateType {
    status: API_STATUS_TYPE;
    data: null;
    error: null | ReducerErrorObject;
    loading: boolean;
    isUserLoggedIn: boolean;
    success: null | boolean;
}

export const initialState: UserStateType = {
    status: null,
    data: null,
    error: null,
    loading: false,
    success: null,
    isUserLoggedIn: false,
};

// Create slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // this will be used when we know that we do need to clear access and refresh tokens
        logoutUser: (state) => {
            Object.assign(state, {
                isUserLoggedIn: false,
                data: null,
                error: null,
            });
            localStorage.removeItem('isUserLoggedIn');
        },
        loginUser: (state) => {
            Object.assign(state, {
                isUserLoggedIn: true,
                error: null,
                // data = action.payload; // Assuming payload contains user data
            });
            localStorage.setItem('isUserLoggedIn', 'true');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInAction.pending, (state) => {
                Object.assign(state, {
                    status: API_STATUS.PENDING,
                    loading: true,
                    success: null,
                    data: null,
                    error: null,
                });
            })
            .addCase(signInAction.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.SUCCESS,
                    loading: false,
                    success: payload.success,
                    data: null,
                    error: null,
                    isUserLoggedIn: true,
                });
                localStorage.setItem('isUserLoggedIn', 'true');
            })
            .addCase(signInAction.rejected, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.REJECTED,
                    loading: false,
                    success: false,
                    data: null,
                    error: {
                        message: payload?.message,
                        reasons: payload?.reasons,
                    },
                    isUserLoggedIn: false,
                });
                localStorage.removeItem('isUserLoggedIn');
            })

            // ----------------------------------------------------------------

            .addCase(refreshAction.pending, (state) => {
                Object.assign(state, {
                    status: API_STATUS.PENDING,
                    loading: true,
                    success: null,
                    data: null,
                    error: null,
                });
            })
            .addCase(refreshAction.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.SUCCESS,
                    loading: false,
                    success: payload.success,
                    data: null,
                    error: null,
                    isUserLoggedIn: true,
                });
                localStorage.setItem('isUserLoggedIn', 'true');
            })
            .addCase(refreshAction.rejected, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.REJECTED,
                    loading: false,
                    success: false,
                    data: null,
                    error: {
                        message: payload?.message,
                        reasons: payload?.reasons,
                    },
                    isUserLoggedIn: false,
                });
                localStorage.removeItem('isUserLoggedIn');
            })

            // ----------------------------------------------------------------

            .addCase(logoutAction.pending, (state) => {
                Object.assign(state, {
                    status: API_STATUS.PENDING,
                    loading: true,
                    success: null,
                    data: null,
                    error: null,
                });
            })
            .addCase(logoutAction.fulfilled, (state) => {
                Object.assign(state, {
                    status: API_STATUS.SUCCESS,
                    loading: false,
                    success: true,
                    data: null,
                    error: null,
                    isUserLoggedIn: false,
                });
                localStorage.removeItem('isUserLoggedIn');
            })
            .addCase(logoutAction.rejected, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.REJECTED,
                    loading: false,
                    success: false,
                    data: null,
                    error: {
                        message: payload?.message,
                        reasons: payload?.reasons,
                    },
                    isUserLoggedIn: false,
                });
                localStorage.removeItem('isUserLoggedIn');
            });
    },
});

export const { logoutUser, loginUser } = authSlice.actions;

export default authSlice.reducer;
