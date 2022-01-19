import type { ReactNode } from 'react';
import type { Editor } from 'slate';

export enum Variant {
    CLASSIC = 'classic',
    MODERN = 'modern',
}

export interface Option {
    beta?: boolean;
    icon: ReactNode;
    onClick: (editor: Editor) => void;
    text: string;
}

export interface Settings {
    tooltip?: {
        placement: 'top' | 'right' | 'bottom' | 'left';
        title: string;
    };
    variant?: 'classic' | 'modern';
}
