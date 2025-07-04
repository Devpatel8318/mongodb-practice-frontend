import { Link, React, useEffect, useState } from 'src/deps'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import { useAppSelector } from 'src/Store'
import { API_STATUS } from 'src/utils/callApi'
import { emailValidator } from 'src/utils/emailValidator'
import getErrorMessageAndField from 'src/utils/getErrorMessageAndField'
import { passwordValidator } from 'src/utils/passwordValidator'
import showToast from 'src/utils/showToast'

import { signUpActionDispatcher } from './auth.dispatcher'
import AuthCard from './components/AuthCard'
import Button from './components/Button'
import OAuthButton from './components/OAuthButton'
import TextInput from './components/TextInput'

const Signup = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	})
	const isFirstRender = useIsFirstRender()

	const { loading, status, error } = useAppSelector((store) => store.auth)

	useEffect(() => {
		if (status !== API_STATUS.REJECTED || isFirstRender) return

		const { message, field } = getErrorMessageAndField(error)

		if (field && Object.prototype.hasOwnProperty.call(errors, field)) {
			setErrors((prevErrors) => ({ ...prevErrors, [field]: message }))
		} else {
			showToast('error', message)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, error])

	const validateSubmit = (): boolean => {
		const emailError = emailValidator(formData.email)
		const passwordError = passwordValidator(formData.password)
		const confirmPasswordError =
			formData.password !== formData.confirmPassword
				? 'Passwords do not match'
				: ''

		setErrors({
			email: emailError,
			password: passwordError,
			confirmPassword: confirmPasswordError,
		})

		return !emailError && !passwordError && !confirmPasswordError
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (validateSubmit()) {
			signUpActionDispatcher(formData)
		}
	}

	return (
		<AuthCard
			title="Sign up"
			footerText={
				<p>
					Already have an account?{' '}
					<Link
						to="/login"
						className="focus:outline-hidden font-medium text-blue-600 decoration-2 hover:underline focus:underline"
					>
						Sign in here
					</Link>
				</p>
			}
		>
			<OAuthButton text="Sign up with Google" />

			<div className="flex items-center py-3 text-xs uppercase text-gray-400 before:me-6 before:flex-1 before:border-t before:border-gray-200 after:ms-6 after:flex-1 after:border-t after:border-gray-200">
				Or
			</div>

			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-6">
					<div>
						<TextInput
							label="Email address"
							type="email"
							name="email"
							value={formData.email}
							placeholder="name@company.com"
							onChange={handleChange}
							error={errors.email}
						/>
					</div>
					<div>
						<TextInput
							label="Password"
							type="password"
							name="password"
							value={formData.password}
							placeholder="••••••••"
							onChange={handleChange}
							error={errors.password}
						/>
					</div>
					<div>
						<TextInput
							label="Confirm Password"
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							placeholder="••••••••"
							onChange={handleChange}
							error={errors.confirmPassword}
						/>
					</div>
					<Button type="submit" label="Sign up" disabled={loading} />
				</div>
			</form>
		</AuthCard>
	)
}

export default Signup
