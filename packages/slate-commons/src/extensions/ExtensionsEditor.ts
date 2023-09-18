import type { BaseEditor, Descendant } from 'slate';

import type { Extension } from '../types';

export interface ExtensionsEditor extends BaseEditor {
    extensions: Extension[];

    /**
     * Convert internal editor document value for external consumers.
     * This is a convenient location for removing runtime-only editor elements
     * to prevent the outer systems from persisting temporary data.
     */
    serialize(nodes: Descendant[]): Descendant[];
}

export function withExtensions<T extends BaseEditor>(editor: T): T & ExtensionsEditor {
    const extensionsEditor: T & ExtensionsEditor = Object.assign(editor, {
        extensions: [],
        serialize(nodes: Descendant[]) {
            return extensionsEditor.extensions.reduce(
                (result, extension) => extension.serialize?.(result) ?? result,
                nodes,
            );
        },
    });

    return extensionsEditor;
}
