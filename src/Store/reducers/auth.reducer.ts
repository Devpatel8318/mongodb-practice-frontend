import { createSlice } from '@reduxjs/toolkit';
import { signInAction, refreshAction } from 'src/features/login/auth.action';
import { ErrorResponse, SuccessResponse } from 'src/Types/global';
import { API_STATUS, API_STATUS_TYPE } from 'src/utils/callApi';

export interface UserStateType {
    status: API_STATUS_TYPE;
    data: SuccessResponse | null;
    error: ErrorResponse | null | false;
    isUserLoggedIn: boolean;
}

export const initialState: UserStateType = {
    status: null,
    data: null,
    error: null,
    isUserLoggedIn: false,
};

// Create slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isUserLoggedIn = false;
            state.data = null;
            state.error = null;
            localStorage.removeItem('isUserLoggedIn'); // Remove from localStorage on logout
        },
        loginUser: (state) => {
            state.isUserLoggedIn = true;
            // state.data = action.payload; // Assuming payload contains user data
            state.error = null;
            localStorage.setItem('isUserLoggedIn', 'true'); // Store the login state in localStorage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInAction.pending, (state) => {
                state.status = API_STATUS.PENDING;
                state.data = null;
                state.error = null;
            })
            .addCase(signInAction.fulfilled, (state, { payload }) => {
                state.status = API_STATUS.SUCCESS;
                state.data = {
                    success: true,
                    message: payload.message,
                };
                state.error = null;
                state.isUserLoggedIn = true;
                localStorage.setItem('isUserLoggedIn', 'true'); // Set login state in localStorage
            })
            .addCase(signInAction.rejected, (state, { payload }) => {
                state.status = API_STATUS.REJECTED;
                state.data = null;
                state.error = {
                    success: false,
                    message: payload?.message || '',
                    reasons: payload?.reasons || [],
                };
                state.isUserLoggedIn = false;
                localStorage.removeItem('isUserLoggedIn'); // Remove login state from localStorage on failure
            })
            .addCase(refreshAction.pending, (state) => {
                state.status = API_STATUS.PENDING;
                state.data = null;
                state.error = null;
            })
            .addCase(refreshAction.fulfilled, (state, { payload }) => {
                state.status = API_STATUS.SUCCESS;
                state.data = {
                    success: true,
                    message: payload.message,
                };
                state.error = null;
                state.isUserLoggedIn = true;
                localStorage.setItem('isUserLoggedIn', 'true'); // Update localStorage on refresh success
            })
            .addCase(refreshAction.rejected, (state, { payload }) => {
                state.status = API_STATUS.REJECTED;
                state.data = null;
                state.error = {
                    success: false,
                    message: payload?.message || '',
                    reasons: payload?.reasons || [],
                };
                state.isUserLoggedIn = false;
                localStorage.removeItem('isUserLoggedIn'); // Remove from localStorage on refresh failure
            });
    },
});

export const { logoutUser, loginUser } = authSlice.actions;

export default authSlice.reducer;
