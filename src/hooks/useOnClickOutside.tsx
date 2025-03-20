import { useEffect, RefObject } from 'src/deps';

function useOnClickOutside<T extends HTMLElement>(
    ref: RefObject<T>,
    callback: (argument: MouseEvent | TouchEvent) => void
) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent | TouchEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(event);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        // document.addEventListener('click', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [callback, ref]);
}

export default useOnClickOutside;
