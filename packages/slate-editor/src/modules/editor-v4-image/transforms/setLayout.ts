import type { ImageLayout } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

const setLayout = (editor: Editor, layout: ImageLayout) => {
    Transforms.setNodes(editor, { layout }, { match: isImageNode });
};

export default setLayout;
