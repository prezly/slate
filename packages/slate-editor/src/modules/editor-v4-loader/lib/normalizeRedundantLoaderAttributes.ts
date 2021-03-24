import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import { LoaderContentType } from '../types';

import createLoader from './createLoader';
import isLoaderElement from './isLoaderElement';

const ALLOWED_ATTRIBUTES = Object.keys(
    createLoader({
        contentType: LoaderContentType.ATTACHMENT,
        message: '',
    }),
);

const normalizeRedundantLoaderAttributes = (editor: Editor, [node, path]: NodeEntry): boolean => {
    if (!isLoaderElement(node)) {
        return false;
    }

    return EditorCommands.normalizeRedundantAttributes(editor, [node, path], ALLOWED_ATTRIBUTES);
};

export default normalizeRedundantLoaderAttributes;
