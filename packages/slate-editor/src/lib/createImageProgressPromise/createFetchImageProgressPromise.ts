import { ProgressPromise } from '@prezly/progress-promise';

function createReadableStream(response: Response, onProgress: (progress: number) => void) {
    // to access headers, server must send CORS header "Access-Control-Expose-Headers: content-encoding, content-length x-file-size"
    // server must send custom x-file-size header if gzip or other content-encoding is used
    const contentEncoding = response.headers.get('content-encoding');
    const contentLength = response.headers.get(contentEncoding ? 'x-file-size' : 'content-length');

    if (contentLength === null) {
        throw new Error('Response size header unavailable');
    }

    const total = parseInt(contentLength, 10);
    let loaded = 0;

    return new ReadableStream({
        start(controller) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const reader = response.body!.getReader();

            // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
            read();

            function read() {
                reader
                    .read()
                    .then(({ done, value }) => {
                        if (done) {
                            controller.close();
                            return;
                        }

                        if (value) {
                            loaded += value.byteLength;
                            onProgress((100 * loaded) / total);
                            controller.enqueue(value);
                        }

                        read();
                    })
                    .catch((error) => {
                        controller.error(error);
                    });
            }
        },
    });
}

/**
 * Based on https://github.com/AnthumChris/fetch-progress-indicators/blob/3fd300c/fetch-basic/supported-browser.js
 */
export function createFetchImageProgressPromise(src: string): ProgressPromise<string, number> {
    return new ProgressPromise((resolve, reject, progress) => {
        fetch(src)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                if (!response.body) {
                    throw new Error('ReadableStream not supported in this browser.');
                }

                return new Response(createReadableStream(response, progress));
            })
            .then((response) => response.blob())
            .then((data) => {
                resolve(URL.createObjectURL(data));
            })
            .catch((error) => {
                reject(error);
            });
    });
}
