import { React, useEffect, useMemo, useState } from 'src/deps'

import { useAppSelector } from 'src/Store'
import TableRow from './TableRow'
import QuestionsListTableSkeletonLoader from './SkeletonLoader'
import Pagination from './Pagination'
import FilterDropdown from './FilterDropdown'
import ActiveFilters, { Filters } from './ActiveFilters'
import debounce from 'src/utils/debounce'
import { getAllQuestionsActionDispatcher } from '../../dashboard.action'
import useIsFirstRender from 'src/hooks/useIsFirstRender'
import useLocalStorage from 'src/hooks/useLocalStogare'

import { formatFilters, formatSortQuery } from './helper'
import Searchbar from './Searchbar'
import Card from './Card'
import Header from './Header'

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
		<div className="p-1.5 min-w-full inline-block align-middle">
			<Card className="mb-2 px-6 py-4">
				<div className="flex gap-6 items-center">
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
