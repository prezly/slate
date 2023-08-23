import { useEffect, useState } from 'react';

interface ImageData {
    width: number;
    height: number;
}

type State = {
    error: Error | undefined;
    isLoading: boolean;
} & (
    | { isLoaded: true; src: string; width: number; height: number }
    | { isLoaded: false; src: undefined; width: undefined; height: undefined }
);

export function useImage(src: string): State {
    const [error, setError] = useState<Error>();
    const [isLoading, setLoading] = useState(() => !isImageAlreadyLoaded(src));
    const [data, setData] = useState<ImageData>();

    useEffect(() => {
        const image = new Image();

        function onStartLoading() {
            setLoading(true);
            setError(undefined);
            setData(undefined);
        }

        function onLoaded() {
            setLoading(false);
            setError(undefined);
            setData({
                width: image.naturalWidth,
                height: image.naturalHeight,
            });
        }

        function onError() {
            setLoading(false);
            setError(error);
            setData({
                width: image.naturalWidth,
                height: image.naturalHeight,
            });
        }

        image.addEventListener('load', onLoaded);
        image.addEventListener('error', onError);

        image.src = src;

        if (image.complete) {
            onLoaded();
        } else {
            onStartLoading();
        }

        return () => {
            image.removeEventListener('load', onLoaded);
            image.removeEventListener('error', onError);
        };
    }, [src]);

    if (data) {
        return {
            isLoading: false,
            error: undefined,
            isLoaded: true,
            src,
            width: data.width,
            height: data.height,
        };
    }

    return {
        isLoading,
        error,
        isLoaded: false,
        src: undefined,
        width: undefined,
        height: undefined,
    };
}

function isImageAlreadyLoaded(src: string) {
    const image = new Image();
    image.src = src;
    return image.complete;
}
