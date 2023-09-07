import { useEffect } from 'react';

import type { Extension } from '../types';

import { useExtensionsManager } from './useExtensionsManager';

export function useExtendEditor(extension: Extension): void {
    const manager = useExtensionsManager();

    useEffect(() => manager.register(extension), [manager, extension]);
}
