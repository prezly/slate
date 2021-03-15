import { Editor, Transforms } from 'slate';

import { isImageElement } from '../lib';
import { ImageLayout } from '../types';

const setLayout = (editor: Editor, layout: ImageLayout) => {
    Transforms.setNodes(editor, { layout }, { match: isImageElement });
};

export default setLayout;
