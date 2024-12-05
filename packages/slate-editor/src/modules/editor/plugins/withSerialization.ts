import type { Extension } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';
import type { Descendant } from 'slate';

export interface SerializingEditor {
    serialize(nodes: Descendant[]): Descendant[];
}

export function withSerialization(getExtensions: () => Extension[]) {
    return function <T extends SlateEditor>(editor: T): T & SerializingEditor {
        return Object.assign(editor, {
            serialize(nodes: Descendant[]) {
                return getExtensions().reduce(
                    (result, extension) => extension.serialize?.(result) ?? result,
                    nodes,
                );
            },
        });
    };
}
