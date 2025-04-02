import { useState, Dispatch } from 'react'
import Icons from 'src/assets/svg'
import { cn } from 'src/utils/cn'
import QuestionDescription from './QuestionDescription'

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
		<div className="flex items-center">
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

const LayoutButtons = ({
	onToggle,
	isMaximized,
	onMaximize,
}: {
	isMaximized: boolean
	onToggle: () => void
	onMaximize: () => void
}) => (
	<div className="flex gap-2">
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
		<div className="flex items-center justify-between bg-gray-50 p-2">
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
				return <div>Submissions content goes here</div>

			default:
				return null
		}
	}

	return (
		<div className="flex h-[calc(100vh-60px)] flex-col">
			<Header />
			<div className="flex-1 overflow-auto p-4">{renderContent()}</div>
		</div>
	)
}

export default QuestionPanel
