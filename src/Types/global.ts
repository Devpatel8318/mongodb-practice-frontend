export interface SuccessResponse<T = undefined> {
    success: boolean;
    message: string;
    response?: T;
}

export interface ErrorResponse {
    success: boolean;
    message: string;
    reasons?: string | { field: string; message: string }[];
}
