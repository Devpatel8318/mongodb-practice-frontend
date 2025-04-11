import { Dispatch, memo, useState } from 'react'
import Icons from 'src/assets/svg'
import { useAppSelector } from 'src/Store'
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

	const { loading } = useAppSelector((state) => state.problemPracticePage)

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
				return <div>Submissions content goes here</div>

			// not sure whether to add this or not
			// case 'solutions':
			// 	return <div>Solutions content goes here</div>

			default:
				return null
		}
	}

	const Loader = () => (
		<div className="flex size-full items-center justify-center">
			<svg
				aria-hidden="true"
				className="size-8 animate-spin fill-blue-600 text-gray-200"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
		</div>
	)

	return (
		<div className="relative h-[calc(100vh-60px)]">
			<Header />
			<div className="absolute inset-x-0 bottom-0 top-10 overflow-auto p-4">
				{loading ? <Loader /> : renderContent()}
			</div>
		</div>
	)
}

export default memo(QuestionPanel)
