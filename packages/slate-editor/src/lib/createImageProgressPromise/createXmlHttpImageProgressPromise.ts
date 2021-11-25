import { ProgressPromise } from '@prezly/progress-promise';

/**
 * Based on https://stackoverflow.com/a/22593907
 */
const createXmlHttpImageProgressPromise = (src: string): ProgressPromise<string, number> => {
    return new ProgressPromise((resolve, reject, progress) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', src, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = () => {
            const blob = new Blob([xhr.response]);
            const url = window.URL.createObjectURL(blob);
            resolve(url);
        };

        xhr.onerror = () => {
            reject(new Error(`Failed to load image: ${src}`));
        };

        xhr.onprogress = (event) => {
            progress((100 * event.loaded) / event.total);
        };

        xhr.onloadstart = () => {
            progress(0);
        };

        xhr.send();
    });
};

export default createXmlHttpImageProgressPromise;
