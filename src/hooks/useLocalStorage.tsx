import { useEffect, useState } from 'react'
import { tryCatchSync } from 'src/utils/tryCatch'

export type useLocalStorageSetValue<T> = (
	valueOrFn: T | ((prev: T) => T)
) => void

const useLocalStorage = <T,>(
	key: string,
	defaultValue: T
): [T, useLocalStorageSetValue<T>, () => void] => {
	const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
		const [value, error] = tryCatchSync(() => {
			const stored = localStorage.getItem(key)
			return stored ? (JSON.parse(stored) as T) : defaultValue
		})

		if (error) {
			console.error(`Error reading localStorage key "${key}":`, error)
			return defaultValue
		}

		return value
	})

	useEffect(() => {
		const [, error] = tryCatchSync(() => {
			localStorage.setItem(key, JSON.stringify(localStorageValue))
		})

		if (error) {
			console.error(`Error setting localStorage key "${key}":`, error)
		}
	}, [key, localStorageValue])

	const updateLocalStorage = (valueOrFn: T | ((prev: T) => T)) => {
		setLocalStorageValue((prevValue) =>
			typeof valueOrFn === 'function'
				? (valueOrFn as (prev: T) => T)(prevValue)
				: valueOrFn
		)
	}

	const removeLocalStorage = () => {
		const [, error] = tryCatchSync(() => {
			localStorage.removeItem(key)
		})

		if (error) {
			console.error(`Error removing localStorage key "${key}":`, error)
		}
	}

	return [localStorageValue, updateLocalStorage, removeLocalStorage]
}

export default useLocalStorage
