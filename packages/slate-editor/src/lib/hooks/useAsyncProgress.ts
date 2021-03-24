import ProgressPromise from '@prezly/progress-promise';
import { useEffect } from 'react';

import useAsyncProgressFn, { AsyncProgressState } from './useAsyncProgressFn';

/**
 * ProgressPromise variant of react-use's useAsync()
 * React hook that resolves a function that returns a progress promise (or a regular promise).
 * @see https://streamich.github.io/react-use/?path=/story/side-effects-useasync--docs
 */
export default function useAsyncProgress<T>(
    fn: () => PromiseLike<T> | ProgressPromise<T> | T,
    initialState: AsyncProgressState<T> = { loading: true, progress: 0 },
): AsyncProgressState<T> {
    const [state, callback] = useAsyncProgressFn<T>(fn, initialState);

    useEffect(() => {
        callback();
    }, [callback]);

    return state;
}
