import { useEffect } from 'react'
import Loader from 'src/components/Loader/Loader'
import Card from 'src/features/dashboard/components/Table/components/Card'
import { useAppSelector } from 'src/Store'
import { Submission } from 'src/Store/reducers/questionPanel.reducer'
import { SubmissionStatusEnum } from 'src/Types/enums'

// import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter'
import { fetchSubmissionsActionDispatcher } from './actions/questionPanel.actions'

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

	if (loading) return <Loader />

	const getCardBorderColor = (submission: Submission) => {
		return submission.submissionStatus === SubmissionStatusEnum.CORRECT
			? 'border border-green-300'
			: submission.submissionStatus === SubmissionStatusEnum.INCORRECT
				? 'border border-red-300'
				: ''
	}

	return (
		<>
			{data && data.list.length ? (
				<>
					<div className="mb-4 flex items-center justify-between border-b px-4 py-2">
						{/* <div className="text-sm text-gray-500">Status</div> */}
						<div className="text-sm font-medium">Query</div>
						<div className="text-sm text-gray-500">
							Submission Time
						</div>
					</div>
					{data.list.map((submission) => (
						<Card
							key={submission.submissionId}
							className={`mb-2 flex items-center justify-between p-4 ${getCardBorderColor(submission)}`}
						>
							{/* <div className="text-sm text-gray-500">
								{capitalizeFirstLetter(submission.status)}
							</div> */}
							<div className="text-sm font-medium">
								{submission.query}
							</div>
							<div className="text-sm text-gray-500">
								{new Date(
									submission.createdAt
								).toLocaleString()}
							</div>
						</Card>
					))}
				</>
			) : (
				<div className="text-sm">No Submissions yet!</div>
			)}
		</>
	)
}

export default Submissions
