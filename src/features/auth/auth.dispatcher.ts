import { appDispatcher } from 'src/Store'

import {
	forgotPasswordAction,
	GoogleAuthPayload,
	logoutAction,
	oauthGoogleAction,
	refreshAction,
	resetPasswordAction,
	signInAction,
	signUpAction,
} from './auth.action'

export const oauthGoogleActionDispatcher = (payload: GoogleAuthPayload) => {
	appDispatcher(oauthGoogleAction(payload))
}

export const signInActionDispatcher = (payload: {
	email: string
	password: string
}) => {
	appDispatcher(signInAction(payload))
}

export const signUpActionDispatcher = (payload: {
	email: string
	password: string
}) => {
	appDispatcher(signUpAction(payload))
}

export const refreshActionDispatcher = ({
	doNotShowAlert,
}: {
	doNotShowAlert: boolean
}) => {
	appDispatcher(refreshAction({ doNotShowAlert }))
}

export const logoutActionDispatcher = () => {
	appDispatcher(logoutAction())
}

export const forgotPasswordActionDispatcher = (payload: { email: string }) => {
	appDispatcher(forgotPasswordAction(payload))
}

export const resetPasswordActionDispatcher = (payload: {
	password: string
	token: string
}) => {
	appDispatcher(resetPasswordAction(payload))
}
