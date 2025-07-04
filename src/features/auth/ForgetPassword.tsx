import { Link, React, useEffect, useState } from 'src/deps'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import { useAppSelector } from 'src/Store'
import { API_STATUS } from 'src/utils/callApi'
import { emailValidator } from 'src/utils/emailValidator'
import getErrorMessageAndField from 'src/utils/getErrorMessageAndField'
import showToast from 'src/utils/showToast'

import { forgotPasswordActionDispatcher } from './auth.dispatcher'
import AuthCard from './components/AuthCard'
import Button from './components/Button'
import TextInput from './components/TextInput'

const ForgetPassword = () => {
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')

	const isFirstRender = useIsFirstRender()

	const { loading, status, error } = useAppSelector((store) => store.auth)

	const validateSubmit = (): boolean => {
		const emailError = emailValidator(email)

		setEmailError(emailError)

		return !emailError
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (validateSubmit()) {
			forgotPasswordActionDispatcher({ email })
		}
	}

	useEffect(() => {
		if (status === API_STATUS.REJECTED || isFirstRender) {
			const { message } = getErrorMessageAndField(error)

			if (message) {
				setEmailError(message)
			} else {
				showToast('error', message)
			}
		}

		if (status === API_STATUS.SUCCESS) {
			showToast('success', 'Password reset link sent to your email.')
			setEmail('')
			setEmailError('')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, error])

	return (
		<AuthCard
			title="Forgot password?"
			footerText={
				<p>
					Remember your password?{' '}
					<Link
						to="/signup"
						className="focus:outline-hidden font-medium text-blue-600 decoration-2 hover:underline focus:underline"
					>
						Sign in here
					</Link>
				</p>
			}
		>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-2">
					<div className="mb-4">
						<TextInput
							label="Email address"
							type="email"
							name="email"
							value={email}
							placeholder="name@company.com"
							onChange={handleEmailChange}
							error={emailError}
						/>
					</div>
					<Button
						type="submit"
						label="Reset Password"
						disabled={loading}
					/>
				</div>
			</form>
		</AuthCard>
	)
}

export default ForgetPassword
