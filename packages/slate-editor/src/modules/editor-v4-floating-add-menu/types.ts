import type { ReactNode } from 'react';

export enum Variant {
    CLASSIC = 'classic',
    MODERN = 'modern',
}

export interface Option<Action> {
    action: Action;
    beta?: boolean;
    icon: ReactNode;
    text: string;
    group?: string;
    description?: string;
}

export interface Settings {
    tooltip?: {
        placement: 'top' | 'right' | 'bottom' | 'left';
        title: string;
    };
    variant?: 'classic' | 'modern';
}
