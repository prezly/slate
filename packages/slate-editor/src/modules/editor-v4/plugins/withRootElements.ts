/* eslint-disable no-param-reassign */

import { EditorCommands, Extension } from '@prezly/slate-commons';
import { Editor, Element, Node, NodeEntry } from 'slate';

const disallowAnyParent = () => false;

function normalizeNestedRootElement(
    editor: Editor,
    rootTypes: Element['type'][],
    [node, path]: NodeEntry<Node>,
): boolean {
    if (!Element.isElement(node) || !rootTypes.includes(node.type)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    return EditorCommands.normalizeNestedElement(editor, [node, path], disallowAnyParent);
}

function getRootTypes(getExtensions: () => Extension[]): string[] {
    return getExtensions().reduce<string[]>((result, extension) => {
        if (Array.isArray(extension.rootTypes)) {
            return [...result, ...extension.rootTypes];
        }
        return result;
    }, []);
}

export function withRootElements(getExtensions: () => Extension[]) {
    return <T extends Editor>(editor: T): T => {
        const { normalizeNode } = editor;

        editor.normalizeNode = (entry) => {
            const normalized = normalizeNestedRootElement(
                editor,
                getRootTypes(getExtensions),
                entry,
            );

            if (normalized) {
                return;
            }

            normalizeNode(entry);
        };

        return editor;
    };
}
