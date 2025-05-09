import { React } from 'src/deps'

interface AuthCardProps {
	title: string
	children: React.ReactNode
	footerText?: React.ReactNode
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children, footerText }) => {
	return (
		<div className="flex h-screen items-center bg-brand-bg py-16">
			<div className="mx-auto w-full max-w-md p-6">
				<div className="mt-7 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-7">
					<div className="text-center">
						<h1 className="text-2xl font-bold text-gray-800">
							{title}
						</h1>
						{footerText && (
							<div className="mt-2 text-sm text-gray-600">
								{footerText}
							</div>
						)}
					</div>
					<div className="mt-5">{children}</div>
				</div>
			</div>
		</div>
	)
}

export default AuthCard
