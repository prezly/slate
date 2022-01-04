import { useCallback } from 'react';

import { createImageProgressPromise } from '../createImageProgressPromise';

import { useAsyncProgress } from './useAsyncProgress';

interface State {
    error?: Error;
    loading: boolean;
    progress: number;
    url?: string;
}

export function useImage(src: string): State {
    const getPromise = useCallback(() => createImageProgressPromise(src), [src]);
    const { error, loading, progress, value } = useAsyncProgress(getPromise);
    return { error, loading, progress, url: value };
}
