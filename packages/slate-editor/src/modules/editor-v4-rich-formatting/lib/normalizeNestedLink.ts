import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Node, NodeEntry } from 'slate';

import { ElementType } from '../types';

import isLinkElement from './isLinkElement';

const normalizeNestedLink = (editor: Editor, [node, path]: NodeEntry<Node>): boolean => {
    if (!isLinkElement(node)) {
        // This function does not know how to normalize other nodes.
        return false;
    }

    return EditorCommands.normalizeNestedElement(editor, [node, path], {
        disallowedParentTypes: [ElementType.LINK],
    });
};

export default normalizeNestedLink;
