/* eslint-disable no-param-reassign */

import { EditorCommands, Extension } from '@prezly/slate-commons';
import { Editor, Element, Node, NodeEntry } from 'slate';

const normalizeNestedRootElement = (
    editor: Editor,
    rootTypes: string[],
    [node, path]: NodeEntry<Node>,
): boolean => {
    if (!Element.isElement(node) || !rootTypes.includes(node.type as string)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    return EditorCommands.normalizeNestedElement(editor, [node, path], {
        allowedParentTypes: [],
    });
};

const getRootTypes = (getExtensions: () => Extension[]): string[] =>
    getExtensions().reduce<string[]>((result, extension) => {
        if (Array.isArray(extension.rootTypes)) {
            return [...result, ...extension.rootTypes];
        }
        return result;
    }, []);

const withRootElements = (getExtensions: () => Extension[]) => <T extends Editor>(editor: T): T => {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
        const normalized = normalizeNestedRootElement(editor, getRootTypes(getExtensions), entry);

        if (normalized) {
            return;
        }

        normalizeNode(entry);
    };

    return editor;
};

export default withRootElements;
