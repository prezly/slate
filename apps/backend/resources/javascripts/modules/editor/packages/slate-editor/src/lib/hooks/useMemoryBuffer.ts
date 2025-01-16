import { useRef } from 'react';

export function useMemoryBuffer<T>(data: T, pass: boolean): T | undefined;
export function useMemoryBuffer<T, F>(data: T, pass: boolean, fallback: F): T | F;
export function useMemoryBuffer(data: unknown, pass: boolean, fallback?: unknown) {
    const memory = useRef(data);

    if (pass) {
        memory.current = data;
        return data;
    }

    return fallback ?? memory.current;
}
