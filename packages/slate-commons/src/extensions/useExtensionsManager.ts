import { useContext } from 'react';

import { ExtensionsManagerContext } from './context';
import type { ExtensionsManager } from './types';

export function useExtensionsManager(): ExtensionsManager {
    return useContext(ExtensionsManagerContext);
}
