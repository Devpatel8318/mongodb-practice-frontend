import Icons from 'src/assets/svg'
import JsonView from 'src/components/jsonView/JsonView'
import Loader from 'src/components/Loader/Loader'
import { useAppSelector } from 'src/Store'
import { QuestionDetail } from 'src/Store/reducers/questions.reducer'
import { DifficultyEnum, QuestionProgressEnum } from 'src/Types/enums'

const getProgressIcon = (progress: keyof typeof QuestionProgressEnum) => {
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
	return icons[progress] || null
}

const getDifficultyColor = (difficulty: keyof typeof DifficultyEnum) => {
	const colors: Record<keyof typeof DifficultyEnum, string> = {
		[DifficultyEnum.EASY]: 'text-teal-500',
		[DifficultyEnum.MEDIUM]: 'text-orange-500',
		[DifficultyEnum.HARD]: 'text-red-500',
	}
	return colors[difficulty] || ''
}

const Schema = ({
	dataBaseSchema,
}: {
	dataBaseSchema: QuestionDetail['dataBaseSchema'] | undefined
}) => (
	<div className="mb-8">
		<div className="mb-1 text-sm font-semibold">Database Schema</div>
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

const QuestionDescription = () => {
	const { question, description, progress, difficulty, dataBaseSchema } =
		useAppSelector((store) => store.questionPanel.data) || {}

	const { loading } = useAppSelector((state) => state.questionPanel)

	if (loading) {
		return <Loader />
	}

	return (
		<>
			<h2 className="mb-5 text-2xl font-semibold">{question}</h2>
			<div className="mb-5 flex items-center gap-3">
				<span className="flex gap-1 rounded-full bg-brand-bg px-2 py-1 text-xs">
					{getProgressIcon(progress || QuestionProgressEnum.TODO)}
				</span>

				<span
					className={`rounded-full bg-brand-bg px-2 py-1 text-xs ${getDifficultyColor(difficulty || DifficultyEnum.EASY)}`}
				>
					{difficulty?.toLowerCase()}
				</span>
			</div>
			<div className="mb-8 text-sm">{description}</div>
			<Schema dataBaseSchema={dataBaseSchema} />
		</>
	)
}

export default QuestionDescription
