export interface BaseResponse {
	message: string
}

export interface SuccessResponse<T = undefined> extends BaseResponse {
	data?: T
}

export interface FieldError {
	field: string
	message: string
}

export interface ErrorResponse extends BaseResponse {
	reasons?: FieldError[]
}

export interface ReducerErrorObject {
	message: string
	reasons?: FieldError[]
}
