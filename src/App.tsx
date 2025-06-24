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
// TODO: add key binding for monaco editor submit
// TODO: socket is called multiple times, need to check

*/

import { GoogleOAuthProvider, Toaster, useEffect, useState } from 'src/deps'
import Routers from 'src/router'

import { initializeSocket } from './socket/socket'
import { loginUserDispatcher } from './Store/reducers/auth.reducer'

const App = () => {
	// * this state is required because without this in initial render, private route will get
	// * default false of isUserLoggedIn as false, due to which it will unnecessary call auth/refresh.
	const [initialized, setInitialized] = useState(false)

	useEffect(() => {
		const isLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true'
		if (isLoggedIn) {
			loginUserDispatcher()
			initializeSocket()
		}
		setInitialized(true)
	}, [])

	if (!initialized) {
		return <div>Loading...</div>
	}

	const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || ''

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<Toaster />
			<Routers />
		</GoogleOAuthProvider>
	)
}

export default App
