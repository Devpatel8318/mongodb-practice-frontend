import { ReactDOM, Provider } from 'src/deps'
import './index.css'
import store from './Store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
