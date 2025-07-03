import { useCallback, useEffect, useMemo, useState } from 'src/deps'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import useLocalStorage from 'src/hooks/useLocalStorage'
import { useAppSelector } from 'src/Store'
import { cn } from 'src/utils/cn'
import debounce from 'src/utils/debounce'

import { getAllQuestionsActionDispatcher } from '../../dashboard.action'
import ActiveFilters, { Filters } from './components/ActiveFilters'
import Card from './components/Card'
import FilterDropdown from './components/FilterDropdown'
import Header from './components/Header'
import Pagination from './components/Pagination'
import QuestionsListTableSkeletonLoader from './components/QuestionsListTableSkeletonLoader'
import Searchbar from './components/Searchbar'
import TableRow from './components/TableRow'
import { formatFilters, formatSortQuery } from './helper'

const questionFilters = {
	progress: {
		todo: false,
		attempted: false,
		solved: false,
	},
	difficulty: {
		easy: false,
		medium: false,
		hard: false,
	},
}

export type Sort = Record<string, 'ASC' | 'DESC' | ''>

const QuestionsListTable = () => {
	const [filters, setFilters] = useLocalStorage<Filters>(
		'questions-filters',
		questionFilters
	)
	const [sort, setSort] = useLocalStorage<Sort>('questions-sort', {})
	const [search, setSearch] = useLocalStorage<string>('questions-search', '')
	const [showOnlyBookmarked, setShowOnlyBookmarked] =
		useLocalStorage<boolean>('questions-show-only-bookmarked', false)
	const [openFilter, setOpenFilter] = useState<string | null>(null)

	const itemsPerPageOptions = [10, 20, 50, 100]
	const [page, setPage] = useLocalStorage<number>('questions-page', 1)
	const [itemsPerPage, setItemsPerPage] = useLocalStorage<number>(
		'questions-items-per-page',
		itemsPerPageOptions[1]
	)

	const isFirstRender = useIsFirstRender()

	const handleFilterChange = useCallback(
		(
			filterType: keyof Filters,
			filterValue: keyof Filters[keyof Filters]
		) => {
			setFilters((prevFilters) => ({
				...prevFilters,
				[filterType]: {
					...prevFilters[filterType],
					[filterValue]: !prevFilters[filterType][filterValue],
				},
			}))
		},
		[setFilters]
	)

	const handleRemoveAppliedFilter = (
		filterParent: keyof Filters,
		filterChild: keyof Filters[keyof Filters]
	) => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterParent]: {
				...prevFilters[filterParent],
				[filterChild]: false,
			},
		}))
	}

	const handleItemsPerPageChange = useCallback(
		(value: number) => {
			setItemsPerPage(value)
			setPage(1) // Reset to first page when changing items per page
		},
		[setItemsPerPage, setPage]
	)

	const debouncedFetchQuestions = useMemo(
		() =>
			debounce(
				400,
				({
					page,
					itemsPerPage,
					filterQuery,
					sortQuery,
					searchQuery,
					showOnlyBookmarked,
				}: {
					page: number
					itemsPerPage: number
					filterQuery: string
					sortQuery: string
					searchQuery: string
					showOnlyBookmarked: boolean
				}) => {
					getAllQuestionsActionDispatcher({
						page,
						limit: itemsPerPage,
						filterQuery,
						sortQuery,
						searchQuery,
						showOnlyBookmarked,
					})
				}
			),
		[]
	)

	const fetchQuestions = () => {
		if (isFirstRender) {
			// TODO: testing, if ui works without this then delete this code
			// ignore
		}

		const filterQuery = formatFilters(filters)
		const sortQuery = formatSortQuery(sort)
		const searchQuery = search ? `search=${search}` : ''

		debouncedFetchQuestions({
			page,
			itemsPerPage,
			filterQuery,
			sortQuery,
			searchQuery,
			showOnlyBookmarked,
		})

		return () => {
			debouncedFetchQuestions.cancel()
		}
	}

	useEffect(
		fetchQuestions,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filters, sort, search, showOnlyBookmarked, page, itemsPerPage]
	)

	// Reset page to 1 when filters, sort, or search change
	useEffect(() => {
		setPage(1)
	}, [filters, sort, search, setPage])

	const { loading, data } = useAppSelector((store) => store.dashboard)
	const { list: tableData = [] } = data || {}

	return (
		<div className="inline-block min-w-full p-1.5 align-middle">
			<Card className="mb-2 px-6 py-4">
				<div className="flex items-center gap-6">
					<FilterDropdown
						type="progress"
						label="Progress"
						filters={filters}
						openFilter={openFilter}
						handleFilterChange={handleFilterChange}
						setOpenFilter={setOpenFilter}
					/>
					<FilterDropdown
						type="difficulty"
						label="Difficulty"
						filters={filters}
						openFilter={openFilter}
						handleFilterChange={handleFilterChange}
						setOpenFilter={setOpenFilter}
					/>
					<Searchbar search={search} setSearch={setSearch} />
					<div className="flex items-center gap-x-3">
						<label
							className={cn(
								'text-sm',
								showOnlyBookmarked && 'text-gray-500'
							)}
						>
							All
						</label>

						<label className="relative inline-block h-6 w-11 cursor-pointer">
							<input
								type="checkbox"
								checked={showOnlyBookmarked}
								onChange={(e) =>
									setShowOnlyBookmarked(e.target.checked)
								}
								className="sr-only"
							/>
							<span
								className={`absolute inset-0 rounded-full transition-colors duration-200 ease-in-out ${
									showOnlyBookmarked
										? 'bg-blue-600'
										: 'bg-brand-lighter'
								}`}
							></span>
							<span
								className={`absolute start-0.5 top-1/2 size-5 -translate-y-1/2 rounded-full bg-white transition-transform duration-200 ease-in-out ${
									showOnlyBookmarked ? 'translate-x-full' : ''
								}`}
							></span>
						</label>

						<label
							className={cn(
								'text-sm',
								!showOnlyBookmarked && 'text-gray-500'
							)}
						>
							Bookmarked
						</label>
					</div>
				</div>
				<ActiveFilters
					filters={filters}
					handleRemoveAppliedFilter={handleRemoveAppliedFilter}
				/>
			</Card>
			<Card className="mb-2">
				<table className="min-w-full divide-y divide-gray-200">
					<Header setSort={setSort} sort={sort} />
					<tbody className="divide-y divide-gray-200">
						{loading ? (
							<QuestionsListTableSkeletonLoader />
						) : (
							tableData.map((item, index) => (
								<TableRow key={index} item={item} />
							))
						)}
					</tbody>
				</table>
			</Card>

			<Card>
				<Pagination
					page={page}
					setPage={setPage}
					itemsPerPage={itemsPerPage}
					itemsPerPageOptions={itemsPerPageOptions}
					handleItemsPerPageChange={handleItemsPerPageChange}
				/>
			</Card>
		</div>
	)
}

export default QuestionsListTable
