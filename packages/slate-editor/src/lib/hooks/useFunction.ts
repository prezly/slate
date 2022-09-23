import { useCallback } from 'react';

import { useLatest, useMountedState } from './react-use';

/**
 * Return a stable proxy-function
 * that will always call the latest version of the input function.
 */
export function useFunction<F extends (...params: never[]) => any>(func: F): F {
    const ref = useLatest(func);
    const isMounted = useMountedState();

    return useCallback(
        function (...args) {
            if (!isMounted()) {
                // do not call the callback if the component is no longer mounted
                return;
            }
            return ref.current(...args);
        } as F,
        [],
    );
}
