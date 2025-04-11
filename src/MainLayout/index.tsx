import { memo, useCallback } from 'react'
import Icons from 'src/assets/svg'
import { Link, React, useRef, useState } from 'src/deps'
import { logoutActionDispatcher } from 'src/features/auth/auth.action'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { useAppSelector } from 'src/Store'

const Header = () => {
	const filterRef = useRef<HTMLDivElement | null>(null)
	const [showDropDown, setShowDropDown] = useState(false)
	const [isProfileImageUrlError, setIsProfileImageUrlError] = useState(false)

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
							className="flex size-10 items-center justify-center rounded-full bg-white focus:outline-none"
						>
							{profilePictureUrl && !isProfileImageUrlError ? (
								<img
									src={profilePictureUrl}
									alt="profile"
									width={32}
									height={32}
									className="size-8 rounded-full object-cover"
									// TODO: use a better way to handle image error, use   onError={(e) => e.currentTarget.src = '/default-avatar.png'}
									onError={() =>
										setIsProfileImageUrlError(true)
									}
								/>
							) : (
								<Icons.Images24.Profile />
							)}
						</button>

						{showDropDown && (
							<div
								ref={filterRef}
								className="absolute right-0 z-50 w-32 overflow-visible rounded-lg bg-white shadow-lg"
							>
								<button
									className="flex w-full items-center justify-between border-b px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
									onClick={logoutActionDispatcher}
								>
									Profile
									<Icons.Images16.Profile />
								</button>
								<button
									className="flex w-full items-center justify-between px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
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

const MemoizedHeader = memo(Header) // Memoized Header

interface MainLayoutProps {
	children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<MemoizedHeader />
			<div className="flex grow bg-gray-100 p-2">
				<div className="grow rounded-md">{children}</div>
			</div>
		</div>
	)
}

export default MainLayout
