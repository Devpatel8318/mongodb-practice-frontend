export const passwordValidator = (password: string) => {
	if (!password || !password.trim()) {
		return 'Please enter your Password.'
	}

	return ''
}
