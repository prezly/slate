import type { ComponentType, ReactNode } from 'react';

export function isComponent(icon: ReactNode | ComponentType): icon is ComponentType {
    return typeof icon === 'function';
}
