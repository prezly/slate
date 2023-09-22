import { useEffect, useRef } from 'react';

import type { Extension } from '../types';

import { useExtensionsManager } from './ExtensionManager';

const SUPPORTED_KEYS = Object.keys({
    id: true,
    decorate: true,
    deleteBackward: true,
    deleteForward: true,
    deserialize: true,
    isElementEqual: true,
    isInline: true,
    isRichBlock: true,
    isVoid: true,
    insertBreak: true,
    insertData: true,
    insertText: true,
    normalizeNode: true,
    onDOMBeforeInput: true,
    onKeyDown: true,
    renderElement: true,
    renderLeaf: true,
    serialize: true,
    getFragment: true,
    setFragmentData: true,
    undo: true,
    redo: true,
} satisfies Record<keyof Extension, true>);

export function useRegisterExtension(extension: Extension): null {
    const manager = useExtensionsManager();

    const { id, decorate, onDOMBeforeInput, onKeyDown, renderElement, renderLeaf } = extension;

    const ref = useRef(extension);

    const unsupported = Object.keys(extension).filter((key) => !SUPPORTED_KEYS.includes(key));

    if (unsupported.length > 0) {
        throw new Error(`Unsupported keys passed: ${unsupported.join(', ')}.`);
    }

    useEffect(() => {
        ref.current = extension;
        manager.register(id, ref, {
            decorate,
            onDOMBeforeInput,
            onKeyDown,
            renderElement,
            renderLeaf,
        });
    }, [id, decorate, onDOMBeforeInput, onKeyDown, renderElement, renderLeaf]);

    useEffect(() => {
        // Unregister the extension on unmount
        return () => {
            manager.unregister(id);
        };
    }, [id]);

    return null;
}
