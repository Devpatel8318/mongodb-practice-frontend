import { memo } from 'react'
import JsonView from 'src/components/jsonView/JsonView'
import { SubmissionStateType } from 'src/Store/reducers/submission.reducer'

const SubmissionContent = ({
	data,
	selectedQuestionId,
}: {
	data: SubmissionStateType['data']
	selectedQuestionId: number | null
}) => {
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
						className={correct ? 'text-green-500' : 'text-red-500'}
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

export default memo(SubmissionContent)
