import { Link, React, useState } from 'src/deps'
import { useAppSelector } from 'src/Store'
import { emailValidator } from 'src/utils/emailValidator'

import AuthCard from './components/AuthCard'
import Button from './components/Button'
import TextInput from './components/TextInput'

const ForgetPassword = () => {
	const [email, setEmail] = useState('')
	const [emailError, setEmailError] = useState('')

	const { loading } = useAppSelector((store) => store.auth)

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
			// signInActionDispatcher(email);
		}
	}

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
