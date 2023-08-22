import type { ComponentType, ReactNode } from 'react';

type Order = number;

export interface Option<Action> {
    action: Action;
    icon: ReactNode | ComponentType;
    text: string;
    group: string;
    description: string;
    keywords?: string[];
    suggested?: Order | false;
    // labels
    isBeta?: boolean;
    isNew?: boolean;
}

export interface ExtensionConfiguration {
    tooltip?: {
        placement: 'top' | 'right' | 'bottom' | 'left';
        content: ReactNode;
    };
    withSpecificProviderOptions?: boolean;
}
