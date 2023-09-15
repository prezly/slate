import React, { createContext, type ReactNode, useContext, useMemo, useState } from 'react';

import type { Extension } from '../types';

export interface ExtensionsManager {
    register(extension: Extension | Extension[]): UnregisterFn;
}

type UnregisterFn = () => void;

/**
 * -- CONTEXT --
 * =============
 */

export const ManagerContext = createContext<ExtensionsManager>({
    register() {
        throw new Error(
            'It is required to wrap any code using ExtensionsManager into ExtensionsManagerProvider.',
        );
    },
});
export const ExtensionsContext = createContext<Extension[]>([]);

/**
 * -- HOOKS --
 * ===========
 */

export function useExtensionsManager(): ExtensionsManager {
    return useContext(ManagerContext);
}

export function useExtensions(): Extension[] {
    return useContext(ExtensionsContext);
}

/**
 * -- COMPONENTS --
 * ================
 */

interface Props {
    children: ReactNode;
}

export function ExtensionsManager({ children }: Props) {
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
        <ManagerContext.Provider value={manager}>
            <ExtensionsContext.Provider value={extensions}>{children}</ExtensionsContext.Provider>
        </ManagerContext.Provider>
    );
}
