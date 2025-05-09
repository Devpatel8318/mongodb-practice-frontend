import { React } from 'src/deps'
import { cn } from 'src/utils/cn'

interface ButtonProps {
	// Core props
	type?: 'button' | 'submit' | 'reset'
	label?: string
	onClick?: () => void
	disabled?: boolean
	id?: string
	name?: string

	// Children support (alternative to label)
	children?: React.ReactNode

	// Variants
	variant?:
		| 'primary'
		| 'secondary'
		| 'outline'
		| 'danger'
		| 'success'
		| 'ghost'
		| 'outlineGray'

	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	fullWidth?: boolean

	// Icon support
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode
	iconOnly?: boolean

	// Additional props
	className?: string
	isLoading?: boolean
	loadingText?: string
	form?: string
	dontShowFocusClasses?: boolean
}

const Button: React.FC<ButtonProps> = ({
	// Core props
	type = 'button',
	label,
	onClick,
	disabled = false,
	id,
	name,

	// Children support
	children,

	// Variants
	variant = 'primary',
	size = 'md',
	fullWidth = false,

	// Icon support
	startIcon,
	endIcon,
	iconOnly = false,

	// Additional props
	className = '',
	isLoading = false,
	loadingText,
	form,
	dontShowFocusClasses = false,
}) => {
	const content = children || label

	// Variant styles
	const variantClasses = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
		secondary:
			'bg-brand-lighter text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
		outline:
			'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
		danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
		success:
			'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
		ghost: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
		outlineGray: 'border bg-white text-gray-800 hover:bg-brand-lightest',
	}[variant]

	// Size styles
	const sizeClasses = {
		xs: iconOnly ? 'p-1' : 'px-2.5 py-1.5 text-xs',
		sm: iconOnly ? 'p-1.5' : 'px-3 py-2 text-sm',
		md: iconOnly ? 'p-2' : 'px-4 py-2.5 text-sm',
		lg: iconOnly ? 'p-2.5' : 'px-5 py-3 text-base',
		xl: iconOnly ? 'p-3' : 'px-6 py-3.5 text-base',
	}[size]

	return (
		<button
			id={id}
			name={name}
			type={type}
			onClick={onClick}
			disabled={disabled || isLoading}
			className={cn(
				'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50',
				variantClasses,
				sizeClasses,
				fullWidth && 'w-full',
				!dontShowFocusClasses &&
					'focus:outline-none focus:ring-2 focus:ring-offset-2',
				className
			)}
			form={form}
		>
			{isLoading ? (
				<>
					<svg
						className={cn(
							'h-5 w-5 animate-spin',
							loadingText && 'mr-2'
						)}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					{loadingText || content}
				</>
			) : (
				<>
					{startIcon && (
						<span className={cn(!iconOnly && content && 'mr-2')}>
							{startIcon}
						</span>
					)}
					{(!iconOnly || (!startIcon && !endIcon)) && content}
					{endIcon && (
						<span className={cn(!iconOnly && content && 'ml-2')}>
							{endIcon}
						</span>
					)}
				</>
			)}
		</button>
	)
}

export default Button
