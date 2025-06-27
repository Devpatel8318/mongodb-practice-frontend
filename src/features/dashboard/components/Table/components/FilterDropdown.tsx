import Icons from 'src/assets/svg'
import { memo, React, useCallback, useRef } from 'src/deps'
import Button from 'src/features/auth/components/Button'
import useOnClickOutside from 'src/hooks/useOnClickOutside'

import { Filters } from './ActiveFilters'

type FilterDropdownProps = {
	type: keyof Filters
	label: string
	filters: Filters
	openFilter: string | null
	handleFilterChange: (
		filterType: keyof Filters,
		filterValue: keyof Filters[keyof Filters]
	) => void
	setOpenFilter: React.Dispatch<React.SetStateAction<string | null>>
}
const FilterDropdown = ({
	type,
	label,
	filters,
	openFilter,
	handleFilterChange,
	setOpenFilter,
}: FilterDropdownProps) => {
	const filterRef = useRef<HTMLDivElement | null>(null)

	const toggleFilter = useCallback(
		(filterType: string) => {
			setOpenFilter((prev) => (prev === filterType ? null : filterType))
		},
		[setOpenFilter]
	)

	const handleClick = useCallback(() => {
		toggleFilter(type)
	}, [toggleFilter, type])

	useOnClickOutside(filterRef, (event) => {
		const clickedElement = event.target as Element
		const closestButton = clickedElement?.closest('button')
		const buttonName = closestButton?.getAttribute('name')

		if (buttonName === 'questions-table-filter-button') {
			// * Scenario example: "difficulty" filter dropdown is open and user once again clicks on the "difficulty" filter button
			// * In this case, we should close the difficulty dropdown
			// * but what was happening is that usOnClickOutside was closing the dropdown and then toggleFilter was opening it again
			// * So,need to check if the clicked element is the filter button itself then don't close the dropdown
			return
		}

		setOpenFilter(null)
	})

	const activeFilterCount =
		Object.values(filters[type]).filter(Boolean).length || 0

	return (
		<div className="relative">
			<Button
				name="questions-table-filter-button"
				variant="outlineGray"
				size="sm"
				StartIcon={Icons.Images24.Filter}
				label={label}
				className="border-gray-200"
				onClick={handleClick}
				badgeContent={activeFilterCount}
				dontShowFocusClasses={true}
			/>
			{openFilter === type && (
				<div
					ref={filterRef}
					className="absolute mt-2 min-w-48 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-lg transition-opacity duration-200"
				>
					<div className="divide-y divide-gray-200">
						{Object.entries(filters[type]).map(
							([filter, value]) => (
								<label
									key={filter}
									className="flex px-4 py-2 hover:bg-brand-hover"
								>
									<button
										className="flex grow justify-between border-gray-300"
										onClick={() =>
											handleFilterChange(
												type,
												filter as keyof Filters[keyof Filters]
											)
										}
									>
										<span className="text-sm capitalize text-gray-800">
											{filter}
										</span>
										{value && (
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
							)
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default memo(FilterDropdown)
