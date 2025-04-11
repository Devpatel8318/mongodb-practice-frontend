import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import { React } from 'src/deps'

import { oauthGoogleActionDispatcher } from '../auth.dispatcher'

const OAuthButton: React.FC = () => {
	const responseGoogle = async (authResult: {
		code?: string
		error?: string
	}) => {
		try {
			if (authResult['code']) {
				oauthGoogleActionDispatcher({ code: authResult.code })
			} else {
				console.log('Error occurred in responseGoogle:', authResult)
			}
		} catch (e) {
			console.log(e)
		}
	}

	const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: () => {
			console.error('Google login failed')
		},
		flow: 'auth-code',
		scope: 'openid email profile',
		redirect_uri: 'postmessage',
	})

	useGoogleOneTapLogin({
		onSuccess: (credentialResponse) => {
			if (credentialResponse.credential) {
				oauthGoogleActionDispatcher({
					credential: credentialResponse.credential,
				})
			} else {
				console.error('Credential is undefined')
			}
		},
		onError: () => {
			console.error('Login Failed')
		},
		// auto_select: true,
	})

	return (
		<button
			type="button"
			onClick={googleLogin}
			className="flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none"
		>
			<svg
				className="h-auto w-4"
				width="46"
				height="47"
				viewBox="0 0 46 47"
				fill="none"
			>
				<path
					d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L38.5191 41.2719C43.4477 37.2181 46 31.1669 46 24.0287Z"
					fill="#4285F4"
				/>
				<path
					d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L2.61097 33.7812C6.36608 41.7125 14.287 47 23.4694 47Z"
					fill="#34A853"
				/>
				<path
					d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588L2.75765 12.8369C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
					fill="#FBBC05"
				/>
				<path
					d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
					fill="#EB4335"
				/>
			</svg>
			Sign up with Google
		</button>
	)
}

export default OAuthButton
