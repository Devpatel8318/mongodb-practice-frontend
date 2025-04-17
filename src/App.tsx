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
//TODO: add key binding for monaco editor submit
// TODO: socket is called multiple times, need to check

*/

import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster, useEffect, useState } from 'src/deps'
import Routers from 'src/router'

import {
	evaluateAnswerDispatcher,
	runOnlyRetrieveDataActionDispatcher,
} from './features/queryPractice/panels/submissionPanel/submission.actions'
import { socket } from './socket/socket'
import { setSocketIdDispatcher } from './socket/socket.action'
import { loginUserDispatcher } from './Store/reducers/auth.reducer'

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
				const {
					questionId,
					question,
					answer,
					submissionId,
					isRunOnly,
				} = data

				if (isRunOnly) {
					runOnlyRetrieveDataActionDispatcher({
						questionId,
						answer,
					})
				} else {
					evaluateAnswerDispatcher({
						questionId,
						question,
						answer,
						submissionId,
					})
				}
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
