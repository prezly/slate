import { useCallback } from 'react';

import { fetchImageWithProgress } from '../fetchImageWithProgress';

import { useAsyncProgress } from './useAsyncProgress';

type OriginalURIOrBlobDataURI = string;

interface State {
    error?: Error;
    loading: boolean;
    progress: number;
    loaded: boolean;
    url: OriginalURIOrBlobDataURI | undefined;
}

export function useImage(src: string): State {
    const fetchImage = useCallback(() => fetchImageWithProgress(src), [src]);
    const { error, loading, progress, value } = useAsyncProgress(fetchImage);
    return { error, loading, progress, loaded: Boolean(value), url: value };
}
