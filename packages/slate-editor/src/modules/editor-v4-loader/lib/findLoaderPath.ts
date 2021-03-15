import { EditorCommands } from '@prezly/slate-commons';
import { Editor, Path } from 'slate';

import { LoaderElementType } from '../types';

import isLoaderElement from './isLoaderElement';

const findLoaderPath = (editor: Editor, loaderId: LoaderElementType['id']): Path | null => {
    const [nodeEntry] = EditorCommands.findDescendants(
        editor,
        (element) => isLoaderElement(element) && element.id === loaderId,
    );

    return nodeEntry ? nodeEntry[1] : null;
};

export default findLoaderPath;
