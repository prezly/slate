import { EditorCommands } from '@prezly/slate-commons';
import { isDividerNode } from '@prezly/slate-types';
import { Editor, NodeEntry } from 'slate';

import createDivider from './createDivider';

const ALLOWED_ATTRIBUTES = Object.keys(createDivider());

const normalizeRedundantDividerAttributes = (editor: Editor, [node, path]: NodeEntry): boolean => {
    if (!isDividerNode(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantDividerAttributes;
