import { FallbackProps } from 'react-error-boundary'
import { isProd } from 'src/utils/environment'

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
	console.error('Error caught by ErrorBoundary:', error)
	return (
		<div
			role="alert"
			style={{
				padding: '2rem',
				color: 'red',
				textAlign: 'center',
				maxWidth: 400,
				margin: 'auto',
			}}
		>
			<h2>Something went wrong 😞</h2>
			<p>
				{!isProd
					? error.message
					: 'An unexpected error occurred. Please try again.'}
			</p>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

export default ErrorFallback
