import { useState, useEffect } from 'react';

export type useLocalStorageSetValue<T> = (
    valueOrFn: T | ((prev: T) => T)
) => void;

function useLocalStorage<T>(
    key: string,
    defaultValue: T
): [T, useLocalStorageSetValue<T>] {
    const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
        try {
            const value = localStorage.getItem(key);
            return value ? (JSON.parse(value) as T) : defaultValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(localStorageValue));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, localStorageValue]);

    const updateLocalStorage = (valueOrFn: T | ((prev: T) => T)) => {
        setLocalStorageValue((prevValue) =>
            typeof valueOrFn === 'function'
                ? (valueOrFn as (prev: T) => T)(prevValue)
                : valueOrFn
        );
    };

    return [localStorageValue, updateLocalStorage];
}

export default useLocalStorage;
