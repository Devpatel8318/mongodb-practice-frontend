import { ReactDOM, Provider } from 'src/deps'
import './index.css'
import store from './Store'
import App from './App'
import { HelmetProvider } from 'react-helmet-async'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './features/fallbackPages/ErrorFallback'

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
