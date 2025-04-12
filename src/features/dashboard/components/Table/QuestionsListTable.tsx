import { useEffect, useMemo, useState } from 'src/deps'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import useLocalStorage from 'src/hooks/useLocalStorage'
import { useAppSelector } from 'src/Store'
import debounce from 'src/utils/debounce'

import { getAllQuestionsActionDispatcher } from '../../dashboard.action'
import ActiveFilters, { Filters } from './components/ActiveFilters'
import Card from './components/Card'
import FilterDropdown from './components/FilterDropdown'
import Header from './components/Header'
import Pagination from './components/Pagination'
import Searchbar from './components/Searchbar'
import QuestionsListTableSkeletonLoader from './components/SkeletonLoader'
import TableRow from './components/TableRow'
import { formatFilters, formatSortQuery } from './helper'

const questionFilters = {
	status: {
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
	const [search, setSearch] = useState('')
	const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false)
	const [openFilter, setOpenFilter] = useState<string | null>(null)

	const isFirstRender = useIsFirstRender()

	const handleFilterChange = (
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
	}

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

	const debouncedFetchQuestions = useMemo(
		() =>
			debounce(
				400,
				({
					filterQuery,
					sortQuery,
					searchQuery,
					showOnlyBookmarked,
				}) => {
					getAllQuestionsActionDispatcher({
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
		if (isFirstRender) return

		const filterQuery = formatFilters(filters)
		const sortQuery = formatSortQuery(sort)
		const searchQuery = search ? `search=${search}` : ''

		debouncedFetchQuestions({
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
		[filters, sort, search, showOnlyBookmarked]
	)

	const { loading, data } = useAppSelector((store) => store.dashboard)
	const { list: tableData = [] } = data || {}

	return (
		<div className="inline-block min-w-full p-1.5 align-middle">
			<Card className="mb-2 px-6 py-4">
				<div className="flex items-center gap-6">
					<FilterDropdown
						type="status"
						label="Status"
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
						<label className="text-sm text-gray-500">All</label>

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
										: 'bg-gray-200'
								}`}
							></span>
							<span
								className={`absolute start-0.5 top-1/2 size-5 -translate-y-1/2 rounded-full bg-white transition-transform duration-200 ease-in-out ${
									showOnlyBookmarked ? 'translate-x-full' : ''
								}`}
							></span>
						</label>

						<label className="text-sm text-gray-500">
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
				<Pagination />
			</Card>
		</div>
	)
}

export default QuestionsListTable
