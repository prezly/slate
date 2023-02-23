import { useCallback } from 'react';

import { fetchImageWithProgress } from '../fetchImageWithProgress';
import { isSupportedImageOrigin } from '../isSupportedImageOrigin';

import { useAsyncProgress } from './useAsyncProgress';

type OriginalURIOrBlobDataURI = string;

interface State {
    error?: Error;
    loading: boolean;
    progress: number | undefined;
    loaded: boolean;
    url: OriginalURIOrBlobDataURI | undefined;
}

export function useImage(src: string): State {
    const fetchImage = useCallback(() => fetchImageWithProgress(src), [src]);
    const { error, loading, progress, value } = useAsyncProgress(fetchImage);
    return {
        error,
        loading,
        // We can't track progress for unsupported origins and this way we can rely
        // on the <ImageWithLoadingPlaceholder> component to estimate the progress.
        progress: isSupportedImageOrigin(src) ? progress : undefined,
        loaded: Boolean(value),
        url: value,
    };
}
