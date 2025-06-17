import { memo, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Icons from 'src/assets/svg'
import JsonView from 'src/components/jsonView/JsonView'
import { CodeContext } from 'src/contexts/codeContext/CodeContext'
import Button from 'src/features/auth/components/Button'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import { useAppSelector } from 'src/Store'
import {
	setQuestionStatusAsAttemptedDispatcher,
	setQuestionStatusAsSolvedDispatcher,
} from 'src/Store/reducers/questionPanel.reducer'
import { QuestionProgressEnum } from 'src/Types/enums'
import { API_STATUS } from 'src/utils/callApi'
import getErrorMessageAndField from 'src/utils/getErrorMessageAndField'
import showToast from 'src/utils/showToast'

import {
	runAnswerActionDispatcher,
	submitAnswerActionDispatcher,
} from './submission.actions'

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
	const isFirstRender = useIsFirstRender()

	const {
		submissionFlowLoading,
		data,
		status,
		error: submissionError,
	} = useAppSelector((store) => store.submission)

	const { selectedQuestionId, data: questionData } = useAppSelector(
		(store) => store.questionPanel
	)
	const questionStatus = questionData?.progress

	const navigate = useNavigate()
	const { code } = useContext(CodeContext)
	const { socketId } = useAppSelector((store) => store.socket)

	const validate = (): string | false => {
		if (!code.trim()) return 'code editor can not be empty'

		return false
	}

	const handleSubmit = () => {
		const validatorResponse = validate()

		if (validatorResponse) return showToast('error', validatorResponse)

		//for type script
		if (!selectedQuestionId) {
			console.error('selectedQuestionId not found', selectedQuestionId)
			showToast('error', 'Something went wrong')
			return navigate('/')
		}

		if (questionStatus === QuestionProgressEnum.TODO) {
			setQuestionStatusAsAttemptedDispatcher()
		}
		submitAnswerActionDispatcher({
			questionId: selectedQuestionId,
			answer: code,
			socketId,
		})
	}

	const handleRun = () => {
		const validatorResponse = validate()

		if (validatorResponse) return showToast('error', validatorResponse)

		//for type script
		if (!selectedQuestionId) {
			console.error('selectedQuestionId not found', selectedQuestionId)
			showToast('error', 'Something went wrong')
			return navigate('/')
		}

		runAnswerActionDispatcher({
			questionId: selectedQuestionId,
			answer: code,
			socketId,
		})
	}

	const Header = () => (
		<div className="flex items-center justify-between bg-brand-lightest px-2 py-1">
			<div className="text-sm">Submission</div>
			<div>
				<Button
					variant="outlineGray"
					size="xs"
					label="Run"
					dontShowFocusClasses={true}
					onClick={handleRun}
					className="mr-2"
					endIcon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							fill="#1f2937"
						>
							<path d="M320-200v-560l440 280-440 280Z" />
						</svg>
					}
				/>
				<Button
					variant="success"
					size="sm"
					label="Submit"
					dontShowFocusClasses={true}
					onClick={handleSubmit}
				/>
			</div>
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
		if (!data || data.questionId !== selectedQuestionId) return null

		const { output } = data

		const isRunOnly = 'isRunOnly' in data
		const correct = !isRunOnly && data.correct
		const expected = !isRunOnly && data.expected

		return (
			<div>
				{!isRunOnly && (
					<div className="flex items-center gap-2 text-lg">
						<div
							className={
								correct ? 'text-green-500' : 'text-red-500'
							}
						>
							{correct ? 'Correct' : 'Incorrect'}
						</div>
					</div>
				)}

				<div className="mt-2">
					Output:
					<JsonView>{output}</JsonView>
				</div>

				{!isRunOnly && correct === false && (
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
		if (isFirstRender) {
			return
		}

		if (status === API_STATUS.REJECTED && submissionError) {
			const { message } = getErrorMessageAndField(submissionError)
			showToast('error', message, 3000)
		}

		if (
			status === API_STATUS.SUCCESS &&
			data?.questionId === selectedQuestionId
		) {
			const isRunOnly = 'isRunOnly' in data
			const correct = !isRunOnly && data.correct

			if (correct) {
				setQuestionStatusAsSolvedDispatcher()
			}
		}

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
