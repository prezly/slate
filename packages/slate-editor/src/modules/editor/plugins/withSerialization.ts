import type { Extension } from '@prezly/slate-commons';
import type { BaseEditor, Descendant } from 'slate';

export interface SerializingEditor extends BaseEditor {
    serialize(nodes: Descendant[]): Descendant[];
}

export function withSerialization(getExtensions: () => Extension[]) {
    return function <T extends BaseEditor>(editor: T): T & SerializingEditor {
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
