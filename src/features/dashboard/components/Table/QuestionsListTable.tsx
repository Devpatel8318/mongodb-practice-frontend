import { useEffect, useMemo, useState } from 'src/deps'

import { useAppSelector } from 'src/Store'
import TableRow from './components/TableRow'
import QuestionsListTableSkeletonLoader from './components/SkeletonLoader'
import FilterDropdown from './components/FilterDropdown'
import ActiveFilters, { Filters } from './components/ActiveFilters'
import debounce from 'src/utils/debounce'
import { getAllQuestionsActionDispatcher } from '../../dashboard.action'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import useLocalStorage from 'src/hooks/useLocalStorage'

import { formatFilters, formatSortQuery } from './helper'
import Searchbar from './components/Searchbar'
import Card from './components/Card'
import Pagination from './components/Pagination'
import Header from './components/Header'

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
			debounce(400, ({ filterQuery, sortQuery, searchQuery }) => {
				getAllQuestionsActionDispatcher({
					filterQuery,
					sortQuery,
					searchQuery,
				})
			}),
		[]
	)

	const fetchQuestions = () => {
		if (isFirstRender) return

		const filterQuery = formatFilters(filters)
		const sortQuery = formatSortQuery(sort)
		const searchQuery = search ? `search=${search}` : ''

		debouncedFetchQuestions({ filterQuery, sortQuery, searchQuery })

		return () => {
			debouncedFetchQuestions.cancel()
		}
	}

	useEffect(
		fetchQuestions,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[filters, sort, search]
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
