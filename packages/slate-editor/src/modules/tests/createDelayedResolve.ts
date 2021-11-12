export function createDelayedResolve<T extends any>(result: T, delay = 1000) {
    return (): Promise<T> => {
        return new Promise((resolve) => setTimeout(() => resolve(result), delay));
    };
}
