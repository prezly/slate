import { ProgressPromise } from '@prezly/progress-promise';

type LoaderPromise = PromiseLike<any> | ProgressPromise<any>;

const activePromises: {
    [key: string]: LoaderPromise | undefined;
} = {};

/**
 * Global object that keeps track of state of promises that are supposed
 * to dispose of loader blocks in the editor.
 * It works under assumption that ids are globally unique.
 */
const loaderPromiseManager = {
    getPromise: (id: string): LoaderPromise | undefined => {
        return activePromises[id];
    },

    isPending: (id: string): boolean => {
        return Boolean(activePromises[id]);
    },

    track: (id: string, promise: LoaderPromise): void => {
        activePromises[id] = promise;

        const forget = () => {
            activePromises[id] = undefined;
        };

        ProgressPromise.resolve(promise).then(forget, forget);
    },
};

export default loaderPromiseManager;
