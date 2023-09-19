import type { ComponentType, ReactNode } from 'react';

import type { Parameters } from './FloatingAddMenuExtension';

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
    tooltip?: Parameters<unknown>['tooltip'];
    withSpecificProviderOptions?: boolean;
}
