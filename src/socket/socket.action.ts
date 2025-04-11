import { appDispatcher } from 'src/Store'
import { setSocketId } from 'src/Store/reducers/socket.reducer'

export const setSocketIdDispatcher = (socketId: string) => {
	appDispatcher(setSocketId(socketId))
}
