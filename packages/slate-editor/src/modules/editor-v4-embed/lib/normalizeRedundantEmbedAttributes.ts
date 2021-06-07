import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import createEmbed from './createEmbed';
import isEmbedElement from './isEmbedElement';

const ALLOWED_ATTRIBUTES = Object.keys(createEmbed({ type: 'link', url: '', version: '1.0' }, ''));

const normalizeRedundantEmbedAttributes = (editor: Editor, [node, path]: NodeEntry): boolean => {
    if (!isEmbedElement(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantEmbedAttributes;
