import { useEffect } from 'src/deps'

import QuestionsListTable from './components/Table/QuestionsListTable'
import { getAllQuestionsActionDispatcher } from './dashboard.action'

const Dashboard = () => {
	useEffect(() => {
		getAllQuestionsActionDispatcher({})
	}, [])

	return (
		<div className="mx-auto w-9/12">
			<QuestionsListTable />
		</div>
	)
}

export default Dashboard
