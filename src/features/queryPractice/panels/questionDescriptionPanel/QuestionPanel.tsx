import { Dispatch, memo, useState } from 'react'
import { cn } from 'src/utils/cn'

import LayoutButtons from './LayoutButtons'
import QuestionDescription from './QuestionDescription'
import Submissions from './Submissions'

type NavItem = 'description' | 'submissions' | 'solutions'

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
				onClick={() => setNavItem('solutions')}
				className={cn(
					baseButtonStyle,
					navItem === 'solutions'
						? activeButtonStyle
						: inactiveButtonStyle
				)}
			>
				Solutions
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

	const renderContent = () => {
		switch (navItem) {
			case 'description':
				return <QuestionDescription />

			case 'submissions':
				return <Submissions />

			// not sure whether to add this or not
			// case 'solutions':
			// 	return <div>Solutions content goes here</div>

			default:
				return null
		}
	}

	return (
		<div className="relative h-[calc(100vh-60px)]">
			<Header />
			<div className="absolute inset-x-0 bottom-0 top-10 overflow-auto p-4">
				{renderContent()}
			</div>
		</div>
	)
}

export default memo(QuestionPanel)
