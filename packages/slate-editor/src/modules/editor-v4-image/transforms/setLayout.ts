import { isImageNode } from '@prezly/slate-types';
import { Editor, Transforms } from 'slate';

import { ImageLayout } from '../types';

const setLayout = (editor: Editor, layout: ImageLayout) => {
    Transforms.setNodes(editor, { layout }, { match: isImageNode });
};

export default setLayout;
