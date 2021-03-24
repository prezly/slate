import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import createDivider from './createDivider';
import isDividerElement from './isDividerElement';

const ALLOWED_ATTRIBUTES = Object.keys(createDivider());

const normalizeRedundantDividerAttributes = (editor: Editor, [node, path]: NodeEntry): boolean => {
    if (!isDividerElement(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantDividerAttributes;
