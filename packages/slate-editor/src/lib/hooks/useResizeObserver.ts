import { useEffect, useRef } from 'react';

export function useResizeObserver(element: HTMLElement | null, callback: ResizeObserverCallback) {
    const observer = useRef<ResizeObserver | null>(null);

    useEffect(
        function () {
            if (!observer.current) {
                observer.current = new ResizeObserver(callback);
            }
        },
        [observer],
    );

    useEffect(() => {
        if (!element) return;

        observer.current?.observe(element);
        return () => observer.current?.unobserve(element);
    }, [element]);
}
