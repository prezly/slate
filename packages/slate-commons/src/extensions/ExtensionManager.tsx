import React, {
    createContext,
    type ReactNode,
    RefObject,
    useContext,
    useEffect,
    useState,
} from 'react';
import type { Editor } from 'slate';

import type { Extension } from '../types';
import type {
    AdditionalEditorMethods,
    EditorMethodsHooks,
    EditorRenderHooks,
} from '../types/Extension';

import type { ExtensionsEditor } from './ExtensionsEditor';

export interface ExtensionsManager {
    register(
        id: Extension['id'],
        methodsHooks: RefObject<EditorMethodsHooks & AdditionalEditorMethods>,
        propsHooks: EditorRenderHooks,
    ): void;
    unregister(id: Extension['id']): void;
}

/**
 * -- CONTEXT --
 * =============
 */

function requireExtensionsManagerProvider(): never {
    throw new Error(
        'It is required to wrap any code using ExtensionsManager into ExtensionsManagerProvider.',
    );
}

export const ManagerContext = createContext<ExtensionsManager>({
    register: requireExtensionsManagerProvider,
    unregister: requireExtensionsManagerProvider,
});

// FIXME: Introduce ManagerSyncContext to only render the Editor itself after all sub-tree extensions are already mounted.

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

type Entry = {
    id: Extension['id'];
    methodHooks: RefObject<EditorMethodsHooks & AdditionalEditorMethods>;
    renderHooks: EditorRenderHooks;
};

type EntriesMap = Map<Extension['id'], Entry>;

const EDITOR_HOOKS_ENTRIES = new WeakMap<Editor, EntriesMap>();

export function ExtensionsManager<T extends ExtensionsEditor>({ children, editor }: Props<T>) {
    const [counter, setCounter] = useState(0);
    const [manager] = useState<ExtensionsManager>(() => {
        function updateEntries(editor: T, updater: (entries: EntriesMap) => void) {
            const entries = EDITOR_HOOKS_ENTRIES.get(editor) ?? new Map();

            const prevRenderHooks = [...entries.values()].map((entry) => entry.renderHooks);

            updater(entries);

            EDITOR_HOOKS_ENTRIES.set(editor, entries);

            const methodHooks = [...entries.values()].map((entry) => entry.methodHooks);
            const renderHooks = [...entries.values()].map((entry) => entry.renderHooks);

            editor.methodHooks = methodHooks;

            if (!isRenderHooksEqual(prevRenderHooks, renderHooks)) {
                editor.renderHooks = renderHooks;
                setCounter((c) => c + 1);
            }
        }

        return {
            register(
                id: Extension['id'],
                methodHooks: RefObject<EditorMethodsHooks & AdditionalEditorMethods>,
                renderHooks: EditorRenderHooks,
            ) {
                updateEntries(editor, (entries) => {
                    entries.set(id, { id, methodHooks, renderHooks });
                });
            },
            unregister(id: Extension['id']) {
                updateEntries(editor, (entries) => {
                    entries.delete(id);
                });
            },
        };
    });

    /**
     * Force editor re-rendering every time the extensions list is changed.
     */
    useEffect(() => {
        editor.onChange(); // FIXME: Verify this works without causing an infinite update loop.
    }, [counter]);

    return <ManagerContext.Provider value={manager}>{children}</ManagerContext.Provider>;
}

function isRenderHooksEqual(hooks: Entry['renderHooks'][], prevHooks: Entry['renderHooks'][]) {
    if (hooks.length !== prevHooks.length) {
        return false;
    }

    for (let i = 0; i < hooks.length; i++) {
        const hooksParts = parts(hooks[i]);
        const prevHookParts = parts(prevHooks[i]);
        const isEqual = prevHookParts.every((part, index) => part === hooksParts[index]);
        if (!isEqual) {
            return false;
        }
    }

    return true;
}

function parts(hook: Entry['renderHooks']) {
    const { decorate, renderLeaf, renderElement, onDOMBeforeInput, onKeyDown, ...rest } = hook;
    if (Object.keys(rest).length > 0) {
        throw new Error(
            `Logic error: one or more properties are ignored for renderHooks comparison: ${Object.keys(
                rest,
            ).join(', ')}.`,
        );
    }
    return [decorate, renderLeaf, renderElement, onKeyDown, onDOMBeforeInput];
}
