import auth from './auth.reducer'
import dashboard from './dashboard.reducer'
import {
	questionPanelReducer as questionPanel,
	submissionsReducer as submissions,
} from './questionPanel.reducer'
import socket from './socket.reducer'
import submission from './submission.reducer'
import user from './user.reducer'

export { auth, dashboard, questionPanel, socket, submission, submissions, user }
