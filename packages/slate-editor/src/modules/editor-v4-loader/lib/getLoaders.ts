import { EditorCommands } from '@prezly/slate-commons';
import { Editor, NodeEntry } from 'slate';

import { LoaderElementType } from '../types';

import isLoaderElement from './isLoaderElement';

const getLoaders = (editor: Editor): NodeEntry<LoaderElementType>[] => {
    const at = EditorCommands.getEditorRange(editor);

    if (!at) {
        return [];
    }

    const loaders = Editor.nodes(editor, { at, match: isLoaderElement });

    return Array.from(loaders);
};

export default getLoaders;
