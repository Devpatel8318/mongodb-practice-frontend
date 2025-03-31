import { useNavigate } from 'src/deps'
import Icons from 'src/assets/svg'
import { Question } from 'src/Store/reducers/dashboard.reducer'
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter'
import { cn } from 'src/utils/cn'

const getStatusIcon = (status: Question['status']) => {
	const icons = {
		TODO: <Icons.Images16.Todo />,
		SOLVED: <Icons.Images16.Tick />,
		ATTEMPTED: <Icons.Images16.Attempted />,
	}
	return icons[status] || null
}

const getDifficultyColor = (difficulty: Question['difficulty']) => {
	const colors: Record<number, string> = {
		1: 'text-teal-800 bg-teal-100',
		5: 'text-yellow-800 bg-yellow-100',
		10: 'text-red-800 bg-red-100',
	}
	return colors[difficulty] || ''
}

const TableRow = ({ item }: { item: Question }) => {
	const navigate = useNavigate()

	return (
		<tr
			onClick={() => navigate(`/problems/${item.questionId}`)}
			className="hover:bg-gray-100 cursor-pointer"
		>
			<td className="h-px whitespace-nowrap w-2/12 px-6 py-3">
				<span className="text-sm font-medium text-gray-500 flex items-center gap-1">
					{getStatusIcon(item.status)}
					{item.status?.toLowerCase()}
				</span>
			</td>
			<td className="size-px whitespace-nowrap w-8/12 ps-6 py-3">
				<span className="block text-sm font-medium text-gray-800">
					{capitalizeFirstLetter(item.question)}
				</span>
			</td>
			<td className="size-px whitespace-nowrap w-2/12 px-6 py-3">
				<span
					className={cn(
						'`py-1 px-2 inline-flex items-center text-xs font-medium rounded-full capitalize',
						getDifficultyColor(item.difficulty)
					)}
				>
					{item.difficultyLabel}
				</span>
			</td>
		</tr>
	)
}

export default TableRow
