import { Filters } from '../ActiveFilters'

export const formatFilters = (filters: Filters): string => {
	return Object.entries(filters)
		.flatMap(([parent, children]) => {
			const activeFilters = Object.keys(children).filter(
				(key) => (children as Record<string, boolean>)[key]
			)
			return activeFilters.length
				? `${parent}=${activeFilters.join(',')}`
				: []
		})
		.join('&')
}

export const formatSortQuery = (
	sort: Record<string, 'ASC' | 'DESC' | ''>
): string => {
	let sortQuery = ''
	Object.entries(sort).forEach(([key, value]) => {
		if (value) {
			sortQuery += `sortBy=${key}&sortOrder=${value}`
		}
	})

	return sortQuery
}
