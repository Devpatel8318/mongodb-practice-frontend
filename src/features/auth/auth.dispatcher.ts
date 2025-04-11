import { appDispatcher } from 'src/Store'

import {
	GoogleAuthPayload,
	logoutAction,
	oauthGoogleAction,
	refreshAction,
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
