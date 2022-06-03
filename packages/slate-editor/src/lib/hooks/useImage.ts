import { useCallback } from 'react';

import { fetchImageWithProgress } from '../fetchImageWithProgress';

import { useAsyncProgress } from './useAsyncProgress';

interface State {
    error?: Error;
    loading: boolean;
    progress: number;
    loaded: boolean;
}

export function useImage(src: string): State {
    const getPromise = useCallback(() => fetchImageWithProgress(src), [src]);
    const { error, loading, progress, value } = useAsyncProgress(getPromise);
    return { error, loading, progress, loaded: Boolean(value) };
}
