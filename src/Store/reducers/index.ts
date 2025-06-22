import auth from './auth.reducer'
import {
	dashboard as dashboard,
	questionPanelReducer as questionPanel,
	submissionsReducer as submissions,
} from './questions.reducer'
import socket from './socket.reducer'
import solution from './solution.reducer'
import submission from './submission.reducer'
import user from './user.reducer'

export {
	auth,
	dashboard,
	questionPanel,
	socket,
	solution,
	submission,
	submissions,
	user,
}
