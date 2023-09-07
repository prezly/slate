import React, { useMemo, useState, type ReactNode } from 'react';

import type { Extension } from '../types';

import { ExtensionsContext, ExtensionsManagerContext } from './context';
import type { ExtensionsManager } from './types';

interface Props {
    children: ReactNode;
}

export function ExtensionsManagerProvider({ children }: Props) {
    type Entry = { extension: Extension };

    const [entries, setEntries] = useState<Entry[]>([]);
    const [manager] = useState<ExtensionsManager>(() => ({
        register(extension) {
            const entry = { extension };

            setEntries((es) => [...es, entry]);

            return () => {
                setEntries((es) => es.filter((e) => e !== entry));
            };
        },
    }));

    const extensions = useMemo(() => entries.map(({ extension }) => extension), [entries]);

    return (
        <ExtensionsManagerContext.Provider value={manager}>
            <ExtensionsContext.Provider value={extensions}>{children}</ExtensionsContext.Provider>
        </ExtensionsManagerContext.Provider>
    );
}
