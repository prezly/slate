import { useCallback } from 'react';

import { useLatest } from './react-use';

/**
 * Return a stable proxy-function
 * that will always call the latest version of the input function.
 */
export function useFunction<F extends (...params: any) => any>(func: F): F {
    const ref = useLatest(func);
    return useCallback(
        function (...args) {
            return ref.current(...args);
        } as F,
        [],
    );
}
