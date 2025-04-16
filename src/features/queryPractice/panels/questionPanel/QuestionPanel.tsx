import { Dispatch, memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'src/Store'
import { setSelectedQuestionIdDispatcher } from 'src/Store/reducers/questionPanel.reducer'
import { cn } from 'src/utils/cn'

import { fetchQuestionDetailActionDispatcher } from './actions/questionPanel.actions'
import LayoutButtons from './LayoutButtons'
import QuestionDescription from './QuestionDescription'
import Solution from './Solution'
import Submissions from './Submissions'

type NavItem = 'description' | 'submissions' | 'solution'

interface NavButtonsProps {
	navItem: NavItem
	setNavItem: Dispatch<React.SetStateAction<NavItem>>
}

const NavButtons = ({ navItem, setNavItem }: NavButtonsProps) => {
	const baseButtonStyle = 'rounded-md text-sm font-medium'

	const activeButtonStyle = 'opacity-100'
	const inactiveButtonStyle = 'opacity-50'

	return (
		<div className="flex items-center overflow-auto">
			<button
				onClick={() => setNavItem('description')}
				className={cn(
					baseButtonStyle,
					navItem === 'description'
						? activeButtonStyle
						: inactiveButtonStyle
				)}
			>
				Description
			</button>
			<div className="mx-4 h-5 border-r"></div>
			<button
				onClick={() => setNavItem('submissions')}
				className={cn(
					baseButtonStyle,
					navItem === 'submissions'
						? activeButtonStyle
						: inactiveButtonStyle
				)}
			>
				Submissions
			</button>
			<div className="mx-4 h-5 border-r"></div>
			<button
				onClick={() => setNavItem('solution')}
				className={cn(
					baseButtonStyle,
					navItem === 'solution'
						? activeButtonStyle
						: inactiveButtonStyle
				)}
			>
				Solution
			</button>
		</div>
	)
}

const QuestionPanel = ({
	isMaximized,
	onToggle,
	onMaximize,
}: {
	isMaximized: boolean
	onToggle: () => void
	onMaximize: () => void
}) => {
	const [navItem, setNavItem] = useState<NavItem>('description')

	const params = useParams()
	const navigate = useNavigate()
	const { questionId } = params

	const Header = () => (
		<div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center justify-between bg-gray-50 p-2">
			<NavButtons navItem={navItem} setNavItem={setNavItem} />
			<LayoutButtons
				isMaximized={isMaximized}
				onToggle={onToggle}
				onMaximize={onMaximize}
			/>
		</div>
	)

	const { selectedQuestionId } = useAppSelector(
		(store) => store.questionPanel
	)

	useEffect(() => {
		if (questionId) {
			// when page is refreshed, redux will be empty so, if params contains questionId then set this to redux
			if (!selectedQuestionId) {
				setSelectedQuestionIdDispatcher(+questionId)
			}
			fetchQuestionDetailActionDispatcher(+questionId)
		} else {
			// something went wrong
			navigate('/')
		}
	}, [questionId, navigate, selectedQuestionId])

	const renderContent = () => {
		switch (navItem) {
			case 'description':
				return <QuestionDescription />

			case 'submissions':
				return <Submissions />

			case 'solution':
				return <Solution />

			default:
				return null
		}
	}

	return (
		<div className="relative h-[calc(100vh-60px)]">
			<Header />
			<div className="absolute inset-x-0 bottom-0 top-10 min-w-96 overflow-auto p-4">
				{renderContent()}
			</div>
		</div>
	)
}

export default memo(QuestionPanel)
