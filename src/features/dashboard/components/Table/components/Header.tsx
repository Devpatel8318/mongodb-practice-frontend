import React from 'react'
import { useLocalStorageSetValue } from 'src/hooks/useLocalStogare'
import Icons from 'src/assets/svg'
import { Sort } from '../QuestionsListTable'

const tableHeaderData = [
	{ name: 'status', colWidth: 'w-2/12', allowSorting: true },
	{ name: 'question', colWidth: 'w-8/12', allowSorting: false },
	{ name: 'difficulty', colWidth: 'w-2/12', allowSorting: true },
]

const getNextSortStep = (prev: Sort, current: keyof Sort) => {
	const steps = ['ASC', 'DESC', '']

	const nextSort: Sort = {}

	if (prev[current]) {
		const currentIndex = steps.indexOf(prev[current])
		const nextStep = steps[(currentIndex + 1) % steps.length]

		console.log(prev[current], current, nextStep)

		if (!nextStep) {
			delete nextSort[current]
		} else {
			Object.assign(nextSort, {
				[current]: nextStep,
			})
		}
	} else {
		Object.assign(nextSort, {
			[current]: 'ASC',
		})
	}

	return nextSort
}

const Header = ({
	sort,
	setSort,
}: {
	sort: Sort
	setSort: useLocalStorageSetValue<Sort>
}) => {
	const handleSortChange = (name: keyof Sort) => {
		setSort((prevSort) => getNextSortStep(prevSort, name))
	}

	return (
		<thead>
			<tr>
				{tableHeaderData.map((item, index) => (
					<th
						className={`py-3 ps-6 text-start ${item.colWidth}`}
						key={index}
					>
						<div className="flex items-center gap-2">
							<span className="text-xs font-semibold uppercase text-gray-800">
								{item.name}
							</span>

							{item.allowSorting && (
								<button
									className="px-2 py-1 transition-all duration-100 hover:scale-125"
									onClick={() => handleSortChange(item.name)}
								>
									<Icons.Components.SortUpArrow
										color={`${
											sort[
												item.name as keyof typeof sort
											] === 'ASC'
												? '#364153'
												: '#d1d5dc'
										}`}
									/>
									<Icons.Components.SortDownArrow
										color={`${
											sort[
												item.name as keyof typeof sort
											] === 'DESC'
												? '#364153'
												: '#d1d5dc'
										}`}
									/>
								</button>
							)}
						</div>
					</th>
				))}
			</tr>
		</thead>
	)
}

export default Header
