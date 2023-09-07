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
            const entries: Entry[] = (Array.isArray(extension) ? extension : [extension]).map(
                (extension) => ({ extension }),
            );

            setEntries((es) => [...es, ...entries]);

            return () => {
                setEntries((es) => es.filter((e) => !entries.includes(e)));
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
