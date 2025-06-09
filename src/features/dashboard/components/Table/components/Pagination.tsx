import Icons from 'src/assets/svg'
import { useEffect, useMemo, useRef, useState } from 'src/deps'
import Button from 'src/features/auth/components/Button'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { useAppSelector } from 'src/Store'
import debounce from 'src/utils/debounce'

import { getAllQuestionsActionDispatcher } from '../../../dashboard.action'

const ItemsPerPageDropdown = ({
	itemsPerPageOptions,
	itemsPerPage,
	setItemsPerPage,
}: {
	itemsPerPageOptions: number[]
	itemsPerPage: number
	setItemsPerPage: (value: number) => void
}) => {
	const filterRef = useRef(null)

	const [showDropDown, setShowDropDown] = useState(false)

	const toggleFilter = () => {
		setShowDropDown((prev) => !prev)
	}

	useOnClickOutside(filterRef, (event) => {
		const clickedElement = event.target
		const closestButton = (clickedElement as Element)?.closest('button')
		const buttonName = closestButton?.getAttribute('name')

		if (buttonName === 'questions-table-items-per-page-button') return

		setShowDropDown(false)
	})

	return (
		<div className="relative">
			<Button
				name="questions-table-items-per-page-button"
				variant="outlineGray"
				size="sm"
				className="border-gray-200"
				onClick={toggleFilter}
				dontShowFocusClasses={true}
			>
				{itemsPerPage} / page
			</Button>
			{showDropDown && (
				<div
					ref={filterRef}
					className="absolute bottom-full z-20 my-2 min-w-48 divide-y divide-gray-200 rounded-lg bg-white shadow-lg transition-opacity duration-200"
				>
					<div className="divide-y divide-gray-200">
						{itemsPerPageOptions.map((option) => (
							<label
								key={option}
								className="flex px-4 py-2 hover:bg-brand-hover"
							>
								<button
									className="flex grow justify-between rounded-sm border-gray-300"
									onClick={() => {
										setItemsPerPage(option)
										setShowDropDown(false)
									}}
								>
									<span className="text-sm capitalize text-gray-800">
										{option}
									</span>
									{itemsPerPage === option && (
										<svg
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M6.36667 12L2.56667 8.2L3.51667 7.25L6.36667 10.1L12.4833 3.98333L13.4333 4.93333L6.36667 12Z"
												fill="#1F2937"
											/>
										</svg>
									)}
								</button>
							</label>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

const Pagination = () => {
	const itemsPerPageOptions = [10, 20, 50, 100]

	const [page, setPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1])
	const isFirstRender = useIsFirstRender()

	const { data } = useAppSelector((store) => store.dashboard)
	const { total: totalRecords } = data || {}

	const totalPages = Math.ceil((totalRecords || 0) / itemsPerPage)
	const start = (page - 1) * itemsPerPage + 1

	// *  when the API is called total record count is undefined,
	// * causing 'end' to become NaN. To handle this, a condition was added.
	// * Now, only the last page display incorrect data when api is loading, which can be accepted
	const end = totalRecords
		? Math.min(page * itemsPerPage, totalRecords)
		: page * itemsPerPage

	const handleItemsPerPageChange = (value: number) => {
		setItemsPerPage(value)
		setPage(1)
	}

	const debouncedFetchQuestions = useMemo(
		() =>
			debounce(
				300,
				(currentPage: number, currentItemsPerPage: number) => {
					getAllQuestionsActionDispatcher({
						page: currentPage,
						limit: currentItemsPerPage,
					})
				}
			),
		[]
	)

	useEffect(() => {
		if (isFirstRender) return

		debouncedFetchQuestions(page, itemsPerPage)

		return () => {
			debouncedFetchQuestions.cancel()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, itemsPerPage, debouncedFetchQuestions])

	return (
		<div className="flex items-center justify-between px-6 py-4">
			<div className="inline-flex gap-x-2">
				<ItemsPerPageDropdown
					itemsPerPageOptions={itemsPerPageOptions}
					itemsPerPage={itemsPerPage}
					setItemsPerPage={handleItemsPerPageChange}
				/>
			</div>
			<div className="text-sm">
				Showing {start} - {end} {totalRecords && `of ${totalRecords}`}
			</div>
			<div className="inline-flex items-center gap-x-2">
				<Button
					variant="outlineGray"
					size="sm"
					startIcon={<Icons.Images24.LeftArrowPagination />}
					label="Prev"
					dontShowFocusClasses={true}
					onClick={() => setPage((prev) => prev - 1)}
					disabled={page <= 1}
				/>
				<span className="px-2 text-sm">
					Page {page} {totalRecords && `/ ${totalPages}`}
				</span>
				<Button
					variant="outlineGray"
					size="sm"
					endIcon={<Icons.Images24.RightArrowPagination />}
					label="Next"
					dontShowFocusClasses={true}
					onClick={() => setPage((prev) => prev + 1)}
					disabled={page >= totalPages}
				/>
			</div>
		</div>
	)
}

export default Pagination
