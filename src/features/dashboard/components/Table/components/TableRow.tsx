import Icons from 'src/assets/svg'
import { memo, useNavigate } from 'src/deps'
import {
	QuestionDetail,
	setSelectedQuestionIdDispatcher,
} from 'src/Store/reducers/questions.reducer'
import { DifficultyEnum, QuestionProgressEnum } from 'src/Types/enums'
import capitalizeFirstLetter from 'src/utils/capitalizeFirstLetter'

const getProgressIcon = (progress: keyof typeof QuestionProgressEnum) => {
	const icons = {
		TODO: <Icons.Images16.Todo />,
		SOLVED: <Icons.Images16.Tick />,
		ATTEMPTED: <Icons.Images16.Attempted />,
	}
	return icons[progress] || null
}

const getDifficultyColor = (difficulty: keyof typeof DifficultyEnum) => {
	const colors: Record<keyof typeof DifficultyEnum, string> = {
		[DifficultyEnum.EASY]: 'text-teal-800 bg-teal-100',
		[DifficultyEnum.MEDIUM]: 'text-yellow-800 bg-yellow-100',
		[DifficultyEnum.HARD]: 'text-red-800 bg-red-100',
	}
	return colors[difficulty]
}

const TableRow = ({ item }: { item: QuestionDetail }) => {
	const navigate = useNavigate()

	const handleClick = () => {
		const questionId = item.questionId
		setSelectedQuestionIdDispatcher(questionId)
		navigate(`/problems/${questionId}`)
	}

	return (
		<tr
			onClick={handleClick}
			className="cursor-pointer hover:bg-brand-hover"
		>
			<td className="h-px w-2/12 whitespace-nowrap px-6 py-3">
				<span className="flex items-center gap-1 text-sm font-medium text-gray-500">
					{getProgressIcon(item.progress)}
					{item.progress?.toLowerCase()}
				</span>
			</td>
			<td className="size-px w-8/12 whitespace-nowrap py-3 ps-6">
				<span className="block text-sm font-medium text-gray-800">
					{capitalizeFirstLetter(item.question)}
				</span>
			</td>
			<td className="size-px w-2/12 whitespace-nowrap px-6 py-3">
				<span
					className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium capitalize ${getDifficultyColor(item.difficulty)}`}
				>
					{capitalizeFirstLetter(item.difficulty)}
				</span>
			</td>
		</tr>
	)
}

export default memo(TableRow)
