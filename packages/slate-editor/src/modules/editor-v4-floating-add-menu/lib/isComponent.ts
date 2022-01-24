import type { ComponentType, HTMLAttributes, ReactNode } from 'react';

export function isComponent(
    icon: ReactNode | ComponentType,
): icon is ComponentType<HTMLAttributes<SVGElement>> {
    return typeof icon === 'function';
}
