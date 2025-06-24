import { createSlice, uuidv4 } from 'src/deps'

interface SocketState {
	socketId: string
}

const initialState: SocketState = {
	socketId: uuidv4(),
}

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	reducers: {
		setSocketId: (state, { payload }: { payload: string }) => {
			state.socketId = payload
		},
	},
})

export const { setSocketId } = socketSlice.actions

export default socketSlice.reducer
