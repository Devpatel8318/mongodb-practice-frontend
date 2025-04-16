import { useEffect } from 'react'
import Loader from 'src/components/Loader/Loader'
import Card from 'src/features/dashboard/components/Table/components/Card'
import { useAppSelector } from 'src/Store'

import { fetchSolutionActionDispatcher } from './actions/questionPanel.actions'

const Solution = () => {
	const { selectedQuestionId } = useAppSelector(
		(store) => store.questionPanel
	)

	const { data, loading } = useAppSelector((store) => store.solution)

	useEffect(() => {
		if (selectedQuestionId === data?.questionId) {
			return
		}

		if (selectedQuestionId) {
			fetchSolutionActionDispatcher(+selectedQuestionId)
		}
	}, [data?.questionId, selectedQuestionId])

	if (loading) return <Loader />

	return <Card className="px-6 py-4"> {data?.answer}</Card>
}

export default Solution
