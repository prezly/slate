import type { Extension } from '../types';

export interface ExtensionsManager {
    register(extension: Extension): UnregisterFn;
}

export type UnregisterFn = () => void;
