import { CodeContext } from 'src/contexts/codeContext/CodeContext'
import { memo, useContext, useEffect, useNavigate } from 'src/deps'
import SubmissionSkeletonLoader from 'src/features/dashboard/components/Table/components/SubmissionSkeletonLoader'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import { useAppSelector } from 'src/Store'
import {
	setQuestionStatusAsAttemptedDispatcher,
	setQuestionStatusAsSolvedDispatcher,
} from 'src/Store/reducers/questions.reducer'
import { QuestionProgressEnum } from 'src/Types/enums'
import { API_STATUS } from 'src/utils/callApi'
import getErrorMessageAndField from 'src/utils/getErrorMessageAndField'
import showToast from 'src/utils/showToast'

import { fetchSubmissionsActionDispatcher } from '../questionPanel/actions/questionPanel.actions'
import SubmissionContent from './components/SubmissionContent'
import SubmissionHeader from './components/SubmissionHeader'
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
	const navigate = useNavigate()

	const { code } = useContext(CodeContext)

	const {
		submissionFlowLoading,
		data,
		status,
		error: submissionError,
	} = useAppSelector((store) => store.submission)

	const { selectedQuestionId, data: questionData } = useAppSelector(
		(store) => store.questionPanel
	)
	const { socketId } = useAppSelector((store) => store.socket)
	const questionStatus = questionData?.progress

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

	useEffect(() => {
		if (isFirstRender) return

		if (
			selectedQuestionId &&
			[API_STATUS.SUCCESS, API_STATUS.REJECTED].includes(
				status as API_STATUS
			)
		) {
			fetchSubmissionsActionDispatcher(+selectedQuestionId)
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status])

	return (
		<div className="flex h-full flex-col">
			<SubmissionHeader
				handleSubmit={handleSubmit}
				handleRun={handleRun}
				isMaximized={isMaximized}
				isCollapsed={isCollapsed}
				onToggle={onToggle}
				onMaximize={onMaximize}
			/>
			<div className="mb-2 grow overflow-auto p-4 text-sm">
				{submissionFlowLoading ? (
					<SubmissionSkeletonLoader />
				) : (
					<SubmissionContent
						data={data}
						selectedQuestionId={selectedQuestionId}
					/>
				)}
			</div>
		</div>
	)
}

export default memo(SubmissionPanel)
