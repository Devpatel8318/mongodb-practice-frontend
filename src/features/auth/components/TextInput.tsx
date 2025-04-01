import { React, useState } from 'src/deps'
import { cn } from 'src/utils/cn'

interface TextInputProps {
	label: string
	type?: string
	name: string
	value: string
	placeholder?: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	error?: string
	id?: string
	disabled?: boolean
	readOnly?: boolean
	className?: string
	inputClassName?: string
	labelClassName?: string
	errorClassName?: string
}

const TextInput: React.FC<TextInputProps> = ({
	label,
	type = 'text',
	name,
	value,
	placeholder,
	onChange,
	error,
	id = name,
	disabled = false,
	readOnly = false,
	className = '',
	inputClassName = '',
	labelClassName = '',
	errorClassName = '',
}) => {
	const [showPassword, setShowPassword] = useState(false)

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev)
	}

	return (
		<div className={className}>
			<label
				className={`mb-2 block text-sm ${labelClassName}`}
				htmlFor={id}
			>
				{label}
			</label>

			<div className="relative flex items-center">
				<input
					id={id}
					type={
						type === 'password'
							? showPassword
								? 'text'
								: 'password'
							: type
					}
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					disabled={disabled}
					readOnly={readOnly}
					className={cn(
						'px-4 py-2.5 text-sm block w-full border rounded-lg',
						inputClassName,
						error
							? 'border-red-500 focus:ring-red-500 focus:border-red-500'
							: 'border-gray-200 focus:ring-blue-500 focus:border-blue-500',
						disabled &&
							'bg-gray-100 text-gray-500 cursor-not-allowed'
					)}
				/>

				{/* Show/Hide password button (Inside Input Field) */}
				{type === 'password' && (
					<button
						tabIndex={-1}
						type="button"
						className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-600 focus:outline-none"
						onClick={togglePasswordVisibility}
					>
						{showPassword ? 'Hide' : 'Show'}
					</button>
				)}
			</div>

			{error && (
				<p className={`mt-1 text-xs text-red-600 ${errorClassName}`}>
					{error}
				</p>
			)}
		</div>
	)
}

export default TextInput
