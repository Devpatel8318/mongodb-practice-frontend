import { Question } from 'src/Store/reducers/dashboard.reducer'
import Icons from 'src/assets/svg'

const JsonView = ({ children }: { children: React.ReactNode }) => {
	return (
		<pre className="w-fit rounded-md bg-gray-100 p-2 text-xs font-thin">
			{children}
		</pre>
	)
}

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
		5: 'text-yellow-500',
		10: 'text-red-500',
	}
	return colors[difficulty] || ''
}

const usersCollectionData = `{
  "_id": ObjectId("60a6743efb1a2c3d4e56789a"),
  "name": "John Doe",
  "email": "john.doe@example.com"
}`

const ordersCollectionData = `{
  "_id": ObjectId("60a6743efb1a2c3d4e56789b"),
  "userId": ObjectId("60a6743efb1a2c3d4e56789a"),
  "amount": 120.5,
  "date": "2024-03-30T10:15:00Z"
}`

const exampleResponseData = `[
  {
    "_id": ObjectId("60a6743efb1a2c3d4e56789a"),
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
]
`

const QuestionDescription = () => {
	const item = {
		difficulty: 1,
		difficultyLabel: 'Easy',
	}

	return (
		<div className="min-w-96">
			<h2 className="mb-5 text-2xl font-semibold">
				Find Users with More than 5 Orders
			</h2>
			<div className="mb-5 flex items-center gap-3">
				<span className="flex gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs">
					{getStatusIcon('ATTEMPTED')}
				</span>

				<span
					className={`rounded-full bg-gray-100 px-2 py-1 text-xs ${getDifficultyColor(item.difficulty)}`}
				>
					{item.difficultyLabel}
				</span>
			</div>

			<div className="mb-8 text-sm">
				You are given a users collection and an orders collection in a
				MongoDB database. Your task is to write an aggregation query to
				find all users who have placed more than 5 orders.
			</div>

			<div className="mb-8">
				<div className="mb-1 text-sm font-semibold">
					Database Schema
				</div>
				<div className="mb-1">
					<span className="text-sm">Users Collection (users)</span>
					<JsonView>{usersCollectionData}</JsonView>
				</div>
				<div>
					<span className="text-sm">Orders Collection (orders)</span>
					<JsonView>{ordersCollectionData}</JsonView>
				</div>
			</div>

			<div className="mb-8">
				<div className="mb-1 text-sm font-semibold">
					Expected Output
				</div>
				<div className="mb-1">
					<span className="text-sm">
						Your query should return a list of users who have placed
						more than 5 orders, including their _id, name, and
						email.
					</span>

					<JsonView>{exampleResponseData}</JsonView>
				</div>
			</div>

			<div>
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
			</div>

			{/* Add more content as needed */}
		</div>
	)
}

export default QuestionDescription
