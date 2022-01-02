import type { ImageLayout } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function setLayout(editor: Editor, layout: ImageLayout) {
    return Transforms.setNodes(editor, { layout }, { match: isImageNode });
}

