import { React, Link, useRef, useState } from 'src/deps'

import Icons from 'src/assets/svg'
import { useAppSelector } from 'src/Store'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { logoutActionDispatcher } from 'src/features/auth/auth.action'

interface MainLayoutProps {
	children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const filterRef = useRef<HTMLDivElement | null>(null)

	const [showDropDown, setShowDropDown] = useState(false)
	const [isProfileImageUrlError, setIsProfileImageUrlError] = useState(false)

	const toggleFilter = () => {
		setShowDropDown((prev) => !prev)
	}

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
		<div className="w-screen min-h-screen flex flex-col">
			<header className="sticky top-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white border-b border-gray-200 text-sm z-40">
				<nav className="max-w-[85rem] mx-auto w-full px-4 sm:px-6 lg:px-8 flex basis-full items-center justify-between">
					<div className="me-5">
						{/* Logo */}
						<Link
							className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
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
								className="size-10 flex items-center justify-center rounded-full bg-white transition-all duration-50"
							>
								{profilePictureUrl &&
								!isProfileImageUrlError ? (
									<img
										src={profilePictureUrl}
										alt="profile"
										width={32}
										height={32}
										className="rounded-full object-cover w-8 h-8"
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
									className="absolute right-0 w-32  shadow-lg rounded-lg bg-white overflow-hidden"
								>
									<button
										className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 flex justify-between items-center border-b"
										onClick={logoutActionDispatcher}
									>
										Profile
										<Icons.Images16.Profile />
									</button>
									<button
										className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 flex justify-between items-center"
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
			<div className="p-2 bg-gray-100 h-full grow flex">
				<div className="grow rounded-md">{children}</div>
			</div>
		</div>
	)
}

export default MainLayout
