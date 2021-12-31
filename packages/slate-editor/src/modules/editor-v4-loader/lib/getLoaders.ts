import { EditorCommands } from '@prezly/slate-commons';
import type { NodeEntry } from 'slate';
import { Editor } from 'slate';

import type { LoaderNode } from '../types';

import isLoaderElement from './isLoaderElement';

function getLoaders(editor: Editor): NodeEntry<LoaderNode>[] {
    const at = EditorCommands.getEditorRange(editor);

    if (!at) {
        return [];
    }

    const loaders = Editor.nodes(editor, { at, match: isLoaderElement });

    return Array.from(loaders);
}

export default getLoaders;
