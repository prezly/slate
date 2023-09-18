import { useEffect } from 'react';

import type { Extension } from '../types';

import { useExtensionsManager } from './ExtensionManager';

export function useRegisterExtension(extension: Extension): null {
    const manager = useExtensionsManager();

    const {
        id,
        decorate,
        deserialize,
        isElementEqual,
        isInline,
        isRichBlock,
        isVoid,
        insertBreak,
        insertData,
        insertText,
        normalizeNode,
        onDOMBeforeInput,
        onKeyDown,
        renderElement,
        renderLeaf,
        serialize,
        undo,
        redo,
        withOverrides,
        ...rest
    } = extension;

    if (Object.keys(rest).length > 0) {
        throw new Error(`Unsupported keys passed: ${Object.keys(rest).join(', ')}.`);
    }

    // FIXME: [Optimization] Replace callback dependencies with refs

    useEffect(
        () => manager.register(extension),
        [
            manager,
            id,
            decorate,
            deserialize,
            isElementEqual,
            isInline,
            isRichBlock,
            isVoid,
            insertBreak,
            insertData,
            insertText,
            normalizeNode,
            onDOMBeforeInput,
            onKeyDown,
            renderElement,
            renderLeaf,
            serialize,
            undo,
            redo,
            withOverrides,
        ],
    );

    return null;
}
