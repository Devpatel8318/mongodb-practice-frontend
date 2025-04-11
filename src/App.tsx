// Maintaining TODO here
// TODO: migrate to Vite, and remove GENERATE_SOURCEMAP=false from .env, as vite provide this (exclude specific packages from sourceMap) and it is also faster
/**
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapExcludeSources: [/monaco-editor/], // Ignore monaco-editor source maps
      },
    },
  },
});



// TODO: add "yarn type-check" in pre-commit hook


*/

import { useEffect, useState, Toaster } from 'src/deps'

import Routers from 'src/router'
import { loginUserDispatcher } from './Store/reducers/auth.reducer'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { socket } from './socket/socket'
import { evaluateAnswerDispatcher } from './features/queryPractice/panels/submissionPanel/submission.actions'
import { setSocketIdDispatcher } from './socket/socket.action'

const App = () => {
	// * this state is required because without this in initial render, private route will get
	// * default false of isUserLoggedIn as false, due to which it will unnecessary call auth/refresh.
	const [initialized, setInitialized] = useState(false)

	useEffect(() => {
		const isLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true'
		if (isLoggedIn) {
			loginUserDispatcher()
			socket.on('connect', () => {
				// default socketId is already set in reducer
				if (socket.id) {
					setSocketIdDispatcher(socket.id)
				}
				console.log('connected to socket', 'Socket ID:', socket.id)
			})

			socket.on('pickup', async (data) => {
				console.log('pickupData', data)
				const { questionId, question, answer } = data

				evaluateAnswerDispatcher({
					questionId,
					question,
					answer,
				})
			})
		}
		setInitialized(true)
	}, [])

	if (!initialized) {
		return <div>Loading...</div>
	}

	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<Toaster
				toastOptions={{
					duration: 5000,
					success: { duration: 1000 },
					error: { duration: 2000 },
				}}
			/>
			<Routers />
		</GoogleOAuthProvider>
	)
}

export default App
