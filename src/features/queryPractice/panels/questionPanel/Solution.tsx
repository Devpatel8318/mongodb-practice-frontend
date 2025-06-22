import { useEffect } from 'react'
import Icons from 'src/assets/svg'
import JsonView from 'src/components/jsonView/JsonView'
import Loader from 'src/components/Loader/Loader'
import Card from 'src/features/dashboard/components/Table/components/Card'
import { useAppSelector } from 'src/Store'
import { setSolutionSeenDispatcher } from 'src/Store/reducers/questions.reducer'

import { fetchSolutionActionDispatcher } from './actions/questionPanel.actions'

const Solution = () => {
	const { selectedQuestionId, data: questionData } = useAppSelector(
		(store) => store.questionPanel
	)

	const isSolutionSeen = questionData?.isSolutionSeen || false

	const { data, loading } = useAppSelector((store) => store.solution)

	useEffect(() => {
		if (selectedQuestionId === data?.questionId) {
			return
		}

		if (selectedQuestionId && isSolutionSeen) {
			fetchSolutionActionDispatcher(+selectedQuestionId)
		}
	}, [data?.questionId, isSolutionSeen, selectedQuestionId])

	const handleClick = () => {
		if (selectedQuestionId) {
			setSolutionSeenDispatcher()
		}
	}

	if (loading) return <Loader />

	return (
		<>
			{isSolutionSeen ? (
				<Card className="p-4">
					<JsonView>{data?.answer}</JsonView>
				</Card>
			) : (
				<button
					className="flex w-full justify-center gap-2 rounded-lg bg-gray-200 p-2"
					onClick={handleClick}
				>
					<Icons.Images24.Lock /> View Solution
				</button>
			)}
		</>
	)
}

export default Solution
