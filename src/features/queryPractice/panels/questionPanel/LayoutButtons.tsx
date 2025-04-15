import Icons from 'src/assets/svg'
import { useAppSelector } from 'src/Store'

import { toggleBookmarkActionDispatcher } from './actions/questionPanel.actions'

const LayoutButtons = ({
	onToggle,
	isMaximized,
	onMaximize,
}: {
	isMaximized: boolean
	onToggle: () => void
	onMaximize: () => void
}) => {
	const { data } = useAppSelector((state) => state.questionPanel)

	const { isBookmarked, questionId } = data || {}

	return (
		<div className="flex gap-2">
			<button
				onClick={() =>
					questionId && toggleBookmarkActionDispatcher(questionId)
				}
			>
				{isBookmarked ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#1f2937"
					>
						<path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24px"
						viewBox="0 -960 960 960"
						width="24px"
						fill="#1f2937"
					>
						<path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
					</svg>
				)}
			</button>
			{!isMaximized && (
				<button onClick={onToggle} aria-label="Collapse">
					<Icons.Images24.LeftArrowPagination />
				</button>
			)}
			<button
				onClick={onMaximize}
				aria-label={isMaximized ? 'Minimize' : 'Maximize'}
			>
				{isMaximized ? (
					<Icons.Images24.Minimize />
				) : (
					<Icons.Images24.Maximize />
				)}
			</button>
		</div>
	)
}

export default LayoutButtons
