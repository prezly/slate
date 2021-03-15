import ProgressPromise from '@prezly/progress-promise';

import createFetchImageProgressPromise from './createFetchImageProgressPromise';
import createXmlHttpImageProgressPromise from './createXmlHttpImageProgressPromise';

const CORS_ENABLED_ORIGINS = ['https://cdn.uc.assets.prezly.com'];

const isReadableStreamSupported = (() => {
    try {
        // eslint-disable-next-line no-new
        new ReadableStream({});
        return true;
    } catch (error) {
        return false;
    }
})();

const createImageProgressPromise = (src: string): ProgressPromise<string, number> => {
    const { origin } = new URL(src);

    // There are at least 2 ways of tracking loading progress:
    // 1. XMLHttpRequest
    // 2. fetch + ReadableStream - https://github.com/prezly/prezly/pull/8558/files#r500501298
    // The latter is better at tracking progress. The problem is that ReadableStream
    // constructor support has been added in Edge 79. So for browsers that don't support it
    // we default to XMLHttpRequest.

    // Unfortunately AJAX call to download an imagedoes not work if there's CORS policy involved.
    // So we use fetch/XMLHttpRequest only for domains we're sure about.
    // For the rest of domains, we fallback to default Image behavior.
    if (CORS_ENABLED_ORIGINS.includes(origin)) {
        if (isReadableStreamSupported) {
            return createFetchImageProgressPromise(src);
        }

        return createXmlHttpImageProgressPromise(src);
    }

    return new ProgressPromise((resolve, reject) => {
        const image = new Image();
        image.src = src;

        image.addEventListener('load', () => {
            resolve(src);
        });

        image.addEventListener('error', () => {
            reject(new Error(`Failed to load image: ${src}`));
        });
    });
};

export default createImageProgressPromise;
