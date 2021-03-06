import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import { ElementType } from '../types';

import createRichText from './createRichText';
import isRichTextElement from './isRichTextElement';

const ALLOWED_ATTRIBUTES = Object.keys(createRichText(ElementType.HEADING_ONE));

const normalizeRedundantRichTextAttributes = (editor: Editor, [node, path]: NodeEntry): boolean => {
    if (!isRichTextElement(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantRichTextAttributes;
