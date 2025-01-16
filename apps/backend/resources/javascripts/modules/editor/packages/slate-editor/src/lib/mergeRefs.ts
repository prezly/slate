import type { MutableRefObject } from 'react';

type Ref<T> = ((instance: T | null) => void) | MutableRefObject<T | null>;

export function mergeRefs<T>(...refs: (Ref<T> | null)[]): Ref<T> {
    return function (instance: T | null) {
        refs.forEach(function (ref) {
            if (typeof ref === 'function') {
                ref(instance);
            } else if (ref) {
                ref.current = instance;
            }
        });
    };
}
