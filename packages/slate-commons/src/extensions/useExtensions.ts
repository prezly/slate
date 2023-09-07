import { useContext } from 'react';

import type { Extension } from '../types';

import { ExtensionsContext } from './context';

export function useExtensions(): Extension[] {
    return useContext(ExtensionsContext);
}
