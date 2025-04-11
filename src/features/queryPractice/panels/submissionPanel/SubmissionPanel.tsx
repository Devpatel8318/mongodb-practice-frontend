import { memo, useEffect } from 'react'
import Icons from 'src/assets/svg'
import Button from 'src/features/auth/components/Button'
import showToast from 'src/utils/showToast'

import { useAppSelector } from 'src/Store'
import JsonView from 'src/components/jsonView/JsonView'
import { API_STATUS } from 'src/utils/callApi'
import useIsFirstRender from 'src/hooks/useIsFirstRender'

const SubmissionPanel = ({
	isMaximized,
	isCollapsed,
	onToggle,
	onMaximize,
	handleSubmit,
}: {
	isMaximized: boolean
	isCollapsed?: boolean
	onToggle: () => void
	onMaximize: () => void
	handleSubmit: () => void
}) => {
	const isFirstRender = useIsFirstRender()

	const {
		submissionFlowLoading,
		data,
		status,
		error: submissionError,
	} = useAppSelector((store) => store.submission)

	const { selectedQuestionId } = useAppSelector(
		(store) => store.problemPracticePage
	)

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

		const { questionId, correct, expected, output } = data

		// if socket is for questionId which user is not currently solving then show nothing
		console.log(questionId, selectedQuestionId)

		if (questionId !== selectedQuestionId) {
			return <div></div>
		}

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
					Output:
					<JsonView>{output}</JsonView>
				</div>
				{!correct && (
					<div className="mt-2">
						Expected:
						<JsonView>{expected}</JsonView>
					</div>
				)}
			</div>
		)
	}

	// Handle error for both submission and evaluation apis
	useEffect(() => {
		if (
			isFirstRender ||
			(status !== API_STATUS.REJECTED && !submissionError)
		) {
			return
		}

		const defaultErrorMessage = 'Something went wrong'
		const firstErrorReason = submissionError?.reasons?.[0]
		const message = firstErrorReason?.message || defaultErrorMessage
		showToast('error', message)

		// only show error only when status has changed
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status])

	return (
		<div className="flex h-full flex-col">
			<Header />
			<div className="mb-2 grow overflow-auto p-4 text-sm">
				{submissionFlowLoading ? 'loading...' : <Content />}
			</div>
		</div>
	)
}

export default memo(SubmissionPanel)
