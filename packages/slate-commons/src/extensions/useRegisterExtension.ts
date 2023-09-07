import { useEffect } from 'react';

import type { Extension } from '../types';

import { useExtensionsManager } from './useExtensionsManager';

export function useRegisterExtension(extension: Extension): void {
    const manager = useExtensionsManager();

    const {
        id,
        decorate,
        deserialize,
        isElementEqual,
        isInline,
        isRichBlock,
        isVoid,
        normalizeNode,
        onDOMBeforeInput,
        onKeyDown,
        renderElement,
        renderLeaf,
        serialize,
        withOverrides,
        ...rest
    } = extension;

    if (Object.keys(rest).length > 0) {
        throw new Error(`Unsupported keys passed: ${Object.keys(rest).join(', ')}.`);
    }

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
            normalizeNode,
            onDOMBeforeInput,
            onKeyDown,
            renderElement,
            renderLeaf,
            serialize,
            withOverrides,
        ],
    );
}
