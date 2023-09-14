import { createContext } from 'react';

import type { Extension } from '../types';

import type { ExtensionsManager } from './types';

const NULL_MANAGER: ExtensionsManager = {
    register() {
        throw new Error(
            'It is required to wrap any code using ExtensionsManager into ExtensionsManagerProvider.',
        );
    },
};

export const ExtensionsManagerContext = createContext<ExtensionsManager>(NULL_MANAGER);
export const ExtensionsContext = createContext<Extension[]>([]);
