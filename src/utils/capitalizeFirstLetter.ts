const capitalizeFirstLetter = (string: string): string => {
	if (!string?.trim()?.length) return ''

	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
export default capitalizeFirstLetter
