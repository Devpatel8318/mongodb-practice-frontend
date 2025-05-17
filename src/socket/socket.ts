import { io, Socket } from 'socket.io-client'

import {
	evaluateAnswerDispatcher,
	runOnlyRetrieveDataActionDispatcher,
} from '../features/queryPractice/panels/submissionPanel/submission.actions'
import { setSocketIdDispatcher } from './socket.action'

const URL = process.env.REACT_APP_SOCKET_URL

let socket: Socket | null = null

export const initializeSocket = () => {
	if (socket) return socket // Return existing socket if already initialized

	console.log('Socket.IO connecting to:', URL)

	socket = io(URL, {
		reconnectionAttempts: 2,
		reconnectionDelay: 3000,
		auth: {
			token: 'your-auth-token',
			userId: '12345',
			userEmail: 'dev@example.com',
		},
	})

	// Set up event listeners
	socket.on('connect', () => {
		if (socket?.id) {
			setSocketIdDispatcher(socket.id)
		}
		console.log('connected to socket', 'Socket ID:', socket?.id)
	})

	socket.on('pickup', async (data) => {
		console.log('pickupData', data)
		const { questionId, question, answer, submissionId, isRunOnly } = data

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

	return socket
}

export const getSocket = () => socket
