import { memo, useContext } from 'react'
import Icons from 'src/assets/svg'
import Button from 'src/features/auth/components/Button'
import showToast from 'src/utils/showToast'
import { submitAnswerActionDispatcher } from '../problemPracticePage.actions'
import { CodeContext } from 'src/contexts/codeContext/CodeContext'

const SubmissionPanel = ({
	isMaximized,
	isCollapsed,
	onToggle,
	onMaximize,
}: {
	isMaximized: boolean
	isCollapsed?: boolean
	onToggle: () => void
	onMaximize: () => void
}) => {
	const { code } = useContext(CodeContext)

	const validate = (): string | false => {
		if (!code) return 'code editor can not be empty'

		return false
	}

	const handleSubmit = () => {
		const validatorResponse = validate()

		if (validatorResponse) return showToast('error', validatorResponse)

		submitAnswerActionDispatcher({ questionId: 1, answer: code })
	}

	const Header = () => (
		<div className="flex items-center justify-between bg-gray-50 p-2">
			<div className="text-sm">Submission</div>
			<Button
				variant="success"
				size="sm"
				label="Submit"
				dontShowFocusClasses={true}
				onClick={handleSubmit}
				// disabled={page >= totalPages}
			/>
			<div className="flex gap-2">
				{!isMaximized && (
					<button
						onClick={onToggle}
						aria-label={isCollapsed ? 'Expand' : 'Collapse'}
					>
						{isCollapsed ? (
							<Icons.Images24.UpArrowPagination />
						) : (
							<Icons.Images24.DownArrowPagination />
						)}
					</button>
				)}
				<button
					onClick={onMaximize}
					aria-label={isMaximized ? 'Minimize' : 'Maximize'}
				>
					{isMaximized ? (
						<Icons.Images24.Minimize />
					) : (
						<Icons.Images24.Maximize />
					)}
				</button>
			</div>
		</div>
	)

	return (
		<div className="flex h-full flex-col">
			<Header />
			<div className="grow p-4 text-sm">
				Here goes output after submitting
			</div>
		</div>
	)
}

export default memo(SubmissionPanel)
