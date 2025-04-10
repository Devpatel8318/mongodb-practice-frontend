import { memo, useContext } from 'react'
import Icons from 'src/assets/svg'
import Button from 'src/features/auth/components/Button'
import showToast from 'src/utils/showToast'
import { submitAnswerActionDispatcher } from '../problemPracticePage.actions'
import { CodeContext } from 'src/contexts/codeContext/CodeContext'
import { useAppSelector } from 'src/Store'
import JsonView from 'src/components/jsonView/JsonView'

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

	const { submissionFlowLoading, data } = useAppSelector(
		(store) => store.problemPracticePage
	)

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

	const Content = () => {
		if (!data) return <div></div>

		const {
			// questionId, // TODO: check if user is currently solving this question, it that's the case, then show the result
			correct,
			result,
		} = data

		let className = ''

		if (correct) {
			className = 'text-green-500'
		} else {
			className = 'text-red-500'
		}

		return (
			<div>
				<div className="flex items-center gap-2 text-lg">
					<div className={className}>
						{correct ? 'Correct' : 'Incorrect'}
					</div>
				</div>
				<div className="mt-2">
					result:
					<JsonView>{result}</JsonView>
				</div>
			</div>
		)
	}

	return (
		<div className="flex h-full flex-col">
			<Header />
			<div className="grow p-4 text-sm">
				{submissionFlowLoading ? 'loading...' : <Content />}
			</div>
		</div>
	)
}

export default memo(SubmissionPanel)
