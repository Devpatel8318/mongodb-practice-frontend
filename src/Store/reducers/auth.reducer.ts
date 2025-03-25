import { createSlice } from "src/deps";

import {
    logoutAction,
    oauthGoogleAction,
    refreshAction,
    signInAction,
    signUpAction,
} from "src/features/auth/auth.action";
import { ReducerErrorObject } from "src/Types/global";
import { API_STATUS, API_STATUS_TYPE } from "src/utils/callApi";
import { appDispatcher } from "src/Store";
import showToast from "src/utils/showToast";

export interface AuthStateType {
    status: API_STATUS_TYPE;
    error: null | ReducerErrorObject;
    loading: boolean;
    isUserLoggedIn: boolean;
    success: null | boolean;
    email?: string;
    userId?: number;
}

export const initialState: AuthStateType = {
    status: null,
    error: null,
    loading: false,
    success: null,
    isUserLoggedIn: false,
};
// Create slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // this will be used when we know that we do need to clear access and refresh tokens
        logoutUser: (state) => {
            Object.assign(state, {
                isUserLoggedIn: false,
                error: null,
            });
            localStorage.removeItem("isUserLoggedIn");
        },
        loginUser: (state) => {
            Object.assign(state, {
                isUserLoggedIn: true,
                error: null,
                // data = action.payload; // Assuming payload contains user data
            });
            localStorage.setItem("isUserLoggedIn", "true");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(oauthGoogleAction.pending, (state) => {
                Object.assign(state, {
                    status: API_STATUS.PENDING,
                    loading: true,
                    success: null,
                    error: null,
                    email: null,
                });
            })
            .addCase(oauthGoogleAction.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.SUCCESS,
                    loading: false,
                    success: payload.success,
                    error: null,
                    isUserLoggedIn: true,
                    email: payload?.data?.email,
                });
                localStorage.setItem("isUserLoggedIn", "true");
                showToast("success", payload?.message);
            })
            .addCase(oauthGoogleAction.rejected, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.REJECTED,
                    loading: false,
                    success: false,
                    error: {
                        message: payload?.message,
                        reasons: payload?.reasons,
                    },
                    isUserLoggedIn: false,
                });
                localStorage.removeItem("isUserLoggedIn");
                showToast("error", payload?.message || "Something went wrong");
            })
            // ----------------------------------------------------------------

            .addCase(signInAction.pending, (state) => {
                Object.assign(state, {
                    status: API_STATUS.PENDING,
                    loading: true,
                    success: null,
                    error: null,
                    email: null,
                });
            })
            .addCase(signInAction.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.SUCCESS,
                    loading: false,
                    success: payload.success,
                    error: null,
                    isUserLoggedIn: true,
                    email: payload?.data?.email,
                });
                localStorage.setItem("isUserLoggedIn", "true");
                showToast("success", payload?.message);
            })
            .addCase(signInAction.rejected, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.REJECTED,
                    loading: false,
                    success: false,
                    error: {
                        message: payload?.message,
                        reasons: payload?.reasons,
                    },
                    isUserLoggedIn: false,
                });
                localStorage.removeItem("isUserLoggedIn");
                showToast("error", payload?.message || "Something went wrong");
            })
            // ----------------------------------------------------------------

            .addCase(signUpAction.pending, (state) => {
                Object.assign(state, {
                    status: API_STATUS.PENDING,
                    loading: true,
                    success: null,
                    error: null,
                    email: null,
                });
            })
            .addCase(signUpAction.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.SUCCESS,
                    loading: false,
                    success: payload.success,
                    error: null,
                    isUserLoggedIn: true,
                    email: payload?.data?.email,
                });
                localStorage.setItem("isUserLoggedIn", "true");
                showToast("success", payload?.message);
            })
            .addCase(signUpAction.rejected, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.REJECTED,
                    loading: false,
                    success: false,
                    error: {
                        message: payload?.message,
                        reasons: payload?.reasons,
                    },
                    isUserLoggedIn: false,
                });
                localStorage.removeItem("isUserLoggedIn");
                showToast("error", payload?.message || "Something went wrong");
            })
            // ----------------------------------------------------------------

            .addCase(refreshAction.pending, (state) => {
                Object.assign(state, {
                    status: API_STATUS.PENDING,
                    loading: true,
                    success: null,
                    error: null,
                });
            })
            .addCase(refreshAction.fulfilled, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.SUCCESS,
                    loading: false,
                    success: payload.success,
                    error: null,
                    isUserLoggedIn: true,
                });
                localStorage.setItem("isUserLoggedIn", "true");
            })
            .addCase(refreshAction.rejected, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.REJECTED,
                    loading: false,
                    success: false,
                    error: {
                        message: payload?.message,
                        reasons: payload?.reasons,
                    },
                    isUserLoggedIn: false,
                });
                localStorage.removeItem("isUserLoggedIn");
            })
            // ----------------------------------------------------------------

            .addCase(logoutAction.pending, (state) => {
                Object.assign(state, {
                    status: API_STATUS.PENDING,
                    loading: true,
                    success: null,
                    error: null,
                    email: null,
                });
            })
            .addCase(logoutAction.fulfilled, (state) => {
                Object.assign(state, {
                    status: API_STATUS.SUCCESS,
                    loading: false,
                    success: true,
                    error: null,
                    isUserLoggedIn: false,
                });
                localStorage.removeItem("isUserLoggedIn");
            })
            .addCase(logoutAction.rejected, (state, { payload }) => {
                Object.assign(state, {
                    status: API_STATUS.REJECTED,
                    loading: false,
                    success: false,
                    error: {
                        message: payload?.message,
                        reasons: payload?.reasons,
                    },
                    isUserLoggedIn: false,
                });
                localStorage.removeItem("isUserLoggedIn");
            });
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
