import { toast } from 'src/deps'

type toastType = 'success' | 'error' | 'loading' | 'dismiss' | 'remove'

const showToast = (
	toastType: toastType,
	message: string,
	duration?: number,
	_toastId?: string
) => {
	let id = null

	switch (toastType) {
		case 'success':
			id = toast.success(message, { duration: duration || 1000 })
			break

		case 'error':
			id = toast.error(message, { duration: duration || 2000 })
			break

		case 'loading':
			id = toast.loading(message, { duration })
			break

		case 'dismiss':
			id = toast.dismiss(message)
			break

		case 'remove':
			id = toast.remove(message)
			break

		default:
			break
	}

	return id
}

export default showToast
