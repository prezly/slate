import React, { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import type { BaseEditor } from 'slate';

import type { Extension } from '../types';

import type { ExtensionsEditor } from './ExtensionsEditor';

export interface ExtensionsManager {
    register(extension: Extension): UnregisterFn;
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

/**
 * -- HOOKS --
 * ===========
 */

export function useExtensionsManager(): ExtensionsManager {
    return useContext(ManagerContext);
}

/**
 * -- COMPONENTS --
 * ================
 */

interface Props<T extends ExtensionsEditor> {
    children: ReactNode;
    editor: T;
}

type Entry = { extension: Extension };

const EDITOR_EXTENSIONS = new WeakMap<BaseEditor, Entry[]>();

export function ExtensionsManager<T extends ExtensionsEditor>({ children, editor }: Props<T>) {
    const [counter, setCounter] = useState(0);
    const [manager] = useState<ExtensionsManager>(() => {
        function updateEntries(editor: T, updater: (entries: Entry[]) => Entry[]) {
            const entries = EDITOR_EXTENSIONS.get(editor) ?? [];
            const updatedEntries = updater(entries);

            EDITOR_EXTENSIONS.set(editor, updatedEntries);
            editor.extensions = updatedEntries.map(({ extension }) => extension);
            setCounter((c) => c + 1);
        }

        return {
            register(extension) {
                const entry = { extension };
                updateEntries(editor, (entries) => [...entries, entry]);

                return () => {
                    updateEntries(editor, (entries) => entries.filter((e) => e !== entry));
                };
            },
        };
    });

    /**
     * Force editor re-rendering every time the extensions list is changed.
     */
    useEffect(() => {
        editor.onChange();
    }, [counter]);

    return <ManagerContext.Provider value={manager}>{children}</ManagerContext.Provider>;
}
