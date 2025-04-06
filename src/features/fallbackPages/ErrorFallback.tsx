import { FallbackProps } from 'react-error-boundary'

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	return (
		<div role="alert" style={{ padding: '2rem', color: 'red' }}>
			<h2>Something went wrong 😞</h2>
			<p>{error.message}</p>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

export default ErrorFallback
