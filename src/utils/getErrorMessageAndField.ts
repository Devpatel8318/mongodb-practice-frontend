import { ReducerErrorObject } from 'src/Types/global'

const getErrorMessageAndField = (error: ReducerErrorObject | null) => {
	const defaultErrorMessage = 'Something went wrong'
	const firstErrorReason = error?.reasons?.[0]
	const field = firstErrorReason?.field
	const message = firstErrorReason?.message || defaultErrorMessage

	return { field, message }
}

export default getErrorMessageAndField
