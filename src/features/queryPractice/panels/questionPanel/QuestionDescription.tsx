import Icons from 'src/assets/svg'
import JsonView from 'src/components/jsonView/JsonView'
import Loader from 'src/components/Loader/Loader'
import { useAppSelector } from 'src/Store'
import { Question } from 'src/Store/reducers/dashboard.reducer'

const getStatusIcon = (status: Question['status']) => {
	const icons = {
		TODO: (
			<>
				<Icons.Images16.Todo />
				Todo
			</>
		),
		SOLVED: (
			<>
				<Icons.Images16.Tick />
				Solved
			</>
		),
		ATTEMPTED: (
			<>
				<Icons.Images16.Attempted />
				Attempted
			</>
		),
	}
	return icons[status] || null
}

const getDifficultyColor = (difficulty: Question['difficulty']) => {
	const colors: Record<number, string> = {
		1: 'text-teal-500',
		5: 'text-orange-500',
		10: 'text-red-500',
	}
	return colors[difficulty] || ''
}

const QuestionDescription = () => {
	const {
		question,
		description,
		status,
		difficulty,
		difficultyLabel,
		dataBaseSchema,
	} = useAppSelector((store) => store.questionPanel.data) || {}

	const { loading } = useAppSelector((state) => state.questionPanel)

	const Schema = () => {
		return (
			<div className="mb-8">
				<div className="mb-1 text-sm font-semibold">
					Database Schema
				</div>
				<div className="flex flex-col gap-2">
					{dataBaseSchema?.map((item, index) => (
						<div key={index}>
							<span className="text-sm">{item.title}</span>
							<JsonView>{item.schema}</JsonView>
						</div>
					))}
				</div>
			</div>
		)
	}

	if (loading) {
		return <Loader />
	}

	return (
		<>
			<h2 className="mb-5 text-2xl font-semibold">{question}</h2>
			<div className="mb-5 flex items-center gap-3">
				<span className="flex gap-1 rounded-full bg-brand-bg px-2 py-1 text-xs">
					{getStatusIcon(status || 'TODO')}
				</span>

				<span
					className={`rounded-full bg-brand-bg px-2 py-1 text-xs ${getDifficultyColor(difficulty || 1)}`}
				>
					{difficultyLabel}
				</span>
			</div>
			<div className="mb-8 text-sm">{description}</div>
			<Schema />
			{/* <div>
				<div className="mb-1 text-sm font-semibold">Constraints</div>
				<ul style={{ listStyleType: 'disc' }} className="pl-4">
					<li className="mb-1 text-sm">
						A user may have zero or more orders in the orders
						collection.
					</li>
					<li className="mb-1 text-sm">
						Each order is associated with a user via the userId
						field.
					</li>
					<li className="mb-1 text-sm">
						The orders collection may contain thousands of records.
					</li>
				</ul>
			</div> */}
		</>
	)
}

export default QuestionDescription
