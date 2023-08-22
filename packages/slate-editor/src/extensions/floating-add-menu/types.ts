import type { ComponentType, ReactNode } from 'react';

import type { PlaceholderNode } from '#extensions/placeholders';

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
    specialEmbeds?: `${PlaceholderNode.Provider}`[];
}
