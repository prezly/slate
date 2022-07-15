import type { Extension } from '@prezly/slate-commons';
import type { BaseEditor, Node } from 'slate';

export interface SerializingEditor extends BaseEditor {
    serialize(nodes: Node[]): Node[];
}

export function withSerialization(getExtensions: () => Extension[]) {
    return function <T extends BaseEditor>(editor: T): T & SerializingEditor {
        return Object.assign(editor, {
            serialize(nodes: Node[]) {
                return getExtensions().reduce(
                    (result, extension) => extension.serialize?.(result) ?? result,
                    nodes,
                );
            },
        });
    };
}
