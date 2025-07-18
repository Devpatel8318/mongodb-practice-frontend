export const emailValidator = (email: string) => {
	if (!email || !email.trim()) {
		return 'Please enter your email'
	}

	const tester =
		// eslint-disable-next-line no-useless-escape
		/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/

	if (email.length > 254) return "Email can't be longer than 254 characters"

	if (!tester.test(email)) return 'Email is not valid'

	const parts = email.split('@')
	if (parts.length !== 2 || parts[0].length > 64) return 'Email is not valid'

	return ''
}
