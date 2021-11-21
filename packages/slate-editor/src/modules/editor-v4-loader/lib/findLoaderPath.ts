import { EditorCommands } from '@prezly/slate-commons';
import type { Editor, Path } from 'slate';

import type { LoaderNode } from '../types';

import isLoaderElement from './isLoaderElement';

const findLoaderPath = (editor: Editor, loaderId: LoaderNode['id']): Path | null => {
    const [nodeEntry] = EditorCommands.findDescendants(
        editor,
        (element) => isLoaderElement(element) && element.id === loaderId,
    );

    return nodeEntry ? nodeEntry[1] : null;
};

export default findLoaderPath;
