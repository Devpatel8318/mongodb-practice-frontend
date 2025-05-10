import { memo, useCallback } from 'react'
import Icons from 'src/assets/svg'
import Image from 'src/components/Image/Image'
import { Link, React, useRef, useState } from 'src/deps'
import { logoutActionDispatcher } from 'src/features/auth/auth.dispatcher'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { useAppSelector } from 'src/Store'

const Header = () => {
	const filterRef = useRef<HTMLDivElement | null>(null)
	const [showDropDown, setShowDropDown] = useState(false)

	const toggleFilter = useCallback(() => {
		setShowDropDown((prev) => !prev)
	}, [])

	useOnClickOutside(filterRef, (event) => {
		const clickedElement = event.target as Element
		const closestButton = clickedElement?.closest('button')
		const buttonName = closestButton?.getAttribute('name')

		if (buttonName === 'profile-dropdown-button') {
			// * Scenario example: "status" filter dropdown is open and user once again clicks on the "status" filter button
			// * In this case, we should close the status dropdown
			// * but what was happening is that usOnClickOutside was closing the dropdown and then toggleFilter was opening it again
			// * So,need to check if the clicked element is the filter button itself then don't close the dropdown

			return
		}

		setShowDropDown(false)
	})

	const { profilePictureUrl } = useAppSelector((state) => state.user)

	return (
		<header className="sticky top-0 z-40 flex w-full flex-wrap border-b border-gray-300 bg-white text-sm md:flex-nowrap md:justify-start">
			<nav className="mx-auto flex w-full max-w-[85rem] basis-full items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="me-5">
					{/* Logo */}
					<Link
						className="inline-block flex-none rounded-md text-xl font-semibold focus:outline-none"
						to="/"
					>
						MongoAcademy
					</Link>
					{/* End Logo */}
				</div>

				<div className="flex items-center gap-4">
					<div
						className="relative"
						onMouseEnter={() => setShowDropDown(true)}
						onMouseLeave={() => setShowDropDown(false)}
					>
						<button
							name="profile-dropdown-button"
							type="button"
							onClick={toggleFilter}
							aria-label="Open profile menu"
							className="my-1 flex size-8 items-center justify-center overflow-hidden rounded-full bg-white focus:outline-none"
						>
							<Image
								src={profilePictureUrl || ''}
								fallback={<Icons.Images24.Profile />}
							/>
						</button>

						{showDropDown && (
							<div
								ref={filterRef}
								className="absolute right-0 z-50 w-32 overflow-hidden rounded-lg bg-white shadow-lg"
							>
								<button
									className="flex w-full items-center justify-between border-b px-4 py-2 text-left text-sm text-gray-800 hover:bg-brand-hover"
									onClick={logoutActionDispatcher}
								>
									Profile
									<Icons.Images16.Profile />
								</button>
								<button
									className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-800 hover:bg-brand-hover"
									onClick={logoutActionDispatcher}
								>
									Logout
									<Icons.Images16.Logout />
								</button>
							</div>
						)}
					</div>
				</div>
			</nav>
		</header>
	)
}

const MemoizedHeader = memo(Header)

interface MainLayoutProps {
	children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<MemoizedHeader />
			<div className="flex grow bg-brand-bg p-2">
				<div className="grow rounded-md">{children}</div>
			</div>
		</div>
	)
}

export default MainLayout
