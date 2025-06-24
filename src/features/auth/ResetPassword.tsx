import {
	Link,
	React,
	useEffect,
	useLocation,
	useNavigate,
	useRef,
	useState,
} from 'src/deps'
import { useAppSelector } from 'src/Store'
import { API_STATUS } from 'src/utils/callApi'
import getErrorMessageAndField from 'src/utils/getErrorMessageAndField'
import { passwordValidator } from 'src/utils/passwordValidator'
import showToast from 'src/utils/showToast'

import { resetPasswordActionDispatcher } from './auth.dispatcher'
import AuthCard from './components/AuthCard'
import Button from './components/Button'
import TextInput from './components/TextInput'

const ResetPassword = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		password: '',
		confirmPassword: '',
	})
	const [errors, setErrors] = useState({
		password: '',
		confirmPassword: '',
	})

	const tokenRef = useRef<string | null>(null)

	const { loading, status, error } = useAppSelector((store) => store.auth)

	const removeParam = (keyToRemove: string) => {
		const params = new URLSearchParams(location.search)
		params.delete(keyToRemove)

		navigate(
			{
				pathname: location.pathname,
				search: params.toString(),
			},
			{ replace: true }
		)
	}

	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get('token')
		console.log('token', token)

		if (!token) {
			return navigate('/signup', { replace: true })
		}

		removeParam('token')
		tokenRef.current = token

		// only run this effect on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const validateSubmit = (): boolean => {
		const passwordError = passwordValidator(formData.password)
		const confirmPasswordError =
			formData.password !== formData.confirmPassword
				? 'Passwords do not match'
				: ''

		setErrors({
			password: passwordError,
			confirmPassword: confirmPasswordError,
		})

		return !passwordError && !confirmPasswordError
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (validateSubmit()) {
			resetPasswordActionDispatcher({
				password: formData.password,
				token: tokenRef.current || '', // token will not be null here, but adding fallback for type safety
			})
		}
	}

	const handleSuccess = React.useCallback(async () => {
		showToast('success', 'Password reset successfully.')

		setFormData({ password: '', confirmPassword: '' })
		setErrors({ password: '', confirmPassword: '' })

		await new Promise((resolve) => setTimeout(resolve, 1000)) // Delay to show success message

		navigate('/signin', { replace: true })
	}, [navigate])

	useEffect(() => {
		if (status === API_STATUS.REJECTED) {
			const { message } = getErrorMessageAndField(error)

			if (message) {
				setErrors({
					password: message,
					confirmPassword: '',
				})
			} else {
				showToast('error', message)
			}
		}

		if (status === API_STATUS.SUCCESS) {
			handleSuccess()
		}
	}, [status, error, navigate, handleSuccess])

	return (
		<AuthCard
			title="Reset password"
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
				<div className="flex flex-col gap-6">
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

export default ResetPassword
