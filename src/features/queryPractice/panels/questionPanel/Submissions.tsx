import JsonView from 'src/components/jsonView/JsonView'
import Loader from 'src/components/Loader/Loader'
import { useEffect } from 'src/deps'
import Card from 'src/features/dashboard/components/Table/components/Card'
import { useAppSelector } from 'src/Store'
import {
	Submission,
	SubmissionsStateType,
} from 'src/Store/reducers/questions.reducer'
import { SubmissionStatusEnum } from 'src/Types/enums'

// import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter'
import { fetchSubmissionsActionDispatcher } from './actions/questionPanel.actions'

const getCardBorderColor = (submission: Submission) => {
	return submission.submissionStatus === SubmissionStatusEnum.CORRECT
		? 'border border-green-300'
		: submission.submissionStatus === SubmissionStatusEnum.INCORRECT
			? 'border border-red-300'
			: ''
}

const renderList = (data: SubmissionsStateType['data']) => (
	<>
		{data?.list.length ? (
			data.list.map((submission) => (
				<Card
					key={submission.submissionId}
					className={`mb-2 flex items-center justify-between p-4 ${getCardBorderColor(submission)}`}
				>
					<div className="text-sm font-medium">
						<JsonView>{submission.query}</JsonView>
					</div>
					<div className="text-sm text-gray-500">
						{new Date(submission.createdAt).toLocaleString()}
					</div>
				</Card>
			))
		) : (
			<div className="text-sm">No Submissions yet!</div>
		)}
	</>
)

const Submissions = () => {
	const { selectedQuestionId } = useAppSelector(
		(store) => store.questionPanel
	)

	const { data, loading } = useAppSelector((store) => store.submissions)

	useEffect(() => {
		if (selectedQuestionId === data?.questionId) {
			return
		}

		if (selectedQuestionId) {
			fetchSubmissionsActionDispatcher(+selectedQuestionId)
		}
	}, [data?.questionId, selectedQuestionId])

	const showLoader = loading && !data?.list.length

	return (
		<>
			<div className="mb-4 flex items-center justify-between border-b px-4 py-2">
				<div className="text-sm font-medium">Query</div>
				<div className="text-sm text-gray-500">Submission Date</div>
			</div>
			{showLoader ? (
				<div className="flex h-full items-center justify-center">
					<Loader />
				</div>
			) : (
				renderList(data)
			)}
		</>
	)
}

export default Submissions
