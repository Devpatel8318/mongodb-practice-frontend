import { useEffect } from 'src/deps'

import QuestionsListTable from './components/Table/QuestionsListTable'
// import { getAllQuestionsActionDispatcher } from './dashboard.action'

const Dashboard = () => {
	useEffect(() => {
		// TODO: testing, if ui works without this then delete this code
		// getAllQuestionsActionDispatcher({})
	}, [])

	return (
		<div className="mx-auto w-9/12">
			<QuestionsListTable />
		</div>
	)
}

export default Dashboard
