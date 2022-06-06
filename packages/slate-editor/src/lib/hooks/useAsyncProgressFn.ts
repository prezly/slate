import { ProgressPromise } from '@prezly/progress-promise';
import { useCallback, useState } from 'react';

import { useMountedState } from './react-use';

export type AsyncProgressState<T> =
    | {
          error?: undefined;
          loading: boolean;
          progress: number;
          value?: undefined;
      }
    | {
          error: Error;
          loading: false;
          progress: number;
          value?: undefined;
      }
    | {
          error?: undefined;
          loading: false;
          progress: number;
          value: T;
      };

/**
 * ProgressPromise variant of react-use's useAsyncFn().
 * React hook that returns state and a trigger callback for a function
 * that returns a progress promise (or a regular promise).
 * @see https://streamich.github.io/react-use/?path=/story/side-effects-useasyncfn--docs
 */
export function useAsyncProgressFn<T>(
    fn: () => PromiseLike<T> | ProgressPromise<T> | T,
    initialState: AsyncProgressState<T> = { loading: false, progress: 0 },
): [AsyncProgressState<T>, () => ProgressPromise<T>] {
    const [state, setState] = useState<AsyncProgressState<T>>(initialState);
    const isMounted = useMountedState();
    const trigger = useCallback(() => {
        const promise = ProgressPromise.resolve<T>(fn());

        setState({
            loading: true,
            progress: 0,
        });

        return promise.then(
            (value) => {
                if (isMounted()) {
                    setState({
                        loading: false,
                        progress: 100,
                        value,
                    });
                }
                return value;
            },
            (error) => {
                if (isMounted()) {
                    setState(({ progress }) => ({
                        error,
                        loading: false,
                        progress,
                    }));
                }
                return error;
            },
            (progress) => {
                if (isMounted()) {
                    setState((currentState) => ({
                        ...currentState,
                        progress,
                    }));
                }
                return progress;
            },
        );
    }, [fn, isMounted]);

    return [state, trigger];
}
