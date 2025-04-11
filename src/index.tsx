import './index.css'

import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { Provider, ReactDOM } from 'src/deps'

import App from './App'
import ErrorFallback from './features/fallbackPages/ErrorFallback'
import store from './Store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const helmetContext = {}

root.render(
	<ErrorBoundary
		FallbackComponent={ErrorFallback}
		onError={(error, info) => {
			console.error('Global error caught:', error, info)
		}}
	>
		<HelmetProvider context={helmetContext}>
			<Provider store={store}>
				<App />
			</Provider>
		</HelmetProvider>
	</ErrorBoundary>
)
