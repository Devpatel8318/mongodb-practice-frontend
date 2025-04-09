import { io } from 'socket.io-client'

const URL = process.env.REACT_APP_SOCKET_URL

console.log('Socket.IO connecting to:', URL)

export const socket = io(URL, {
	reconnectionAttempts: 2,
	reconnectionDelay: 3000,
	auth: {
		token: 'your-auth-token',
		userId: '12345',
		userEmail: 'dev@example.com',
	},
})
