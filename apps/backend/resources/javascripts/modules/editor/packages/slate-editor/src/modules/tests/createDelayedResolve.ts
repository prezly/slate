export function createDelayedResolve<T>(result: T, delay = 1000) {
    return (): Promise<T> => {
        return new Promise((resolve) => setTimeout(() => resolve(result), delay));
    };
}
