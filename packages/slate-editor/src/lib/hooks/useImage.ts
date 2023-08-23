import { useEffect, useState } from 'react';

interface ImageData {
    width: number;
    height: number;
}

type State = {
    error: Error | undefined;
    loading: boolean;
} & (
    | { loaded: true; src: string; width: number; height: number }
    | { loaded: false; src: undefined; width: undefined; height: undefined }
);

export function useImage(src: string): State {
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(() => isLoaded(src));
    const [data, setData] = useState<ImageData>();

    useEffect(() => {
        let cancelled = false;

        const image = new Image();

        image.addEventListener('load', () => {
            if (cancelled) return;

            setLoading(false);
            setError(undefined);
            setData({
                width: image.naturalWidth,
                height: image.naturalHeight,
            });
        });
        image.addEventListener('error', () => {
            if (cancelled) return;

            setLoading(false);
            setError(error);
            setData({
                width: image.naturalWidth,
                height: image.naturalHeight,
            });
        });

        image.src = src;

        if (image.complete) {
            setLoading(false);
            setError(undefined);
            setData({
                width: image.naturalWidth,
                height: image.naturalHeight,
            });
        } else {
            setLoading(true);
            setError(undefined);
            setData(undefined);
        }

        return () => {
            cancelled = true;
        };
    }, [src]);

    if (data) {
        return {
            loading: false,
            error: undefined,
            loaded: true,
            src,
            width: data.width,
            height: data.height,
        };
    }

    return {
        loading,
        error,
        loaded: false,
        src: undefined,
        width: undefined,
        height: undefined,
    };
}

function isLoaded(src: string) {
    const image = new Image();
    image.src = src;
    return image.complete;
}
