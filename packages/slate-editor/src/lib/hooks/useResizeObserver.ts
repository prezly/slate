import { useEffect, useRef } from 'react';

import { useLatest } from './react-use';

export function useResizeObserver(element: HTMLElement | null, callback: ResizeObserverCallback) {
    const observer = useRef<ResizeObserver | null>(null);
    const props = useLatest({ callback });

    useEffect(
        function () {
            if (!observer.current) {
                observer.current = new ResizeObserver(function (...args) {
                    props.current.callback(...args);
                });
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
