import type { ComponentType, ReactNode } from 'react';

export enum Variant {
    CLASSIC = 'classic',
    MODERN = 'modern',
}

export interface Option<Action> {
    action: Action;
    icon: ReactNode | ComponentType;
    text: string;
    group?: string;
    description?: string;
    // labels
    isBeta?: boolean;
    isNew?: boolean;
}

export interface Settings {
    tooltip?: {
        placement: 'top' | 'right' | 'bottom' | 'left';
        title: string;
    };
    variant?: 'classic' | 'modern';
}
