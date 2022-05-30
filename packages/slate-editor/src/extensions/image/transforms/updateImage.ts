import type { ImageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function updateImage(
    editor: Editor,
    image: ImageNode,
    patch: Partial<Pick<ImageNode, 'align' | 'file' | 'layout' | 'href' | 'width' | 'new_tab'>>,
) {
    Transforms.setNodes<ImageNode>(editor, patch, {
        at: [],
        match: (node) => node === image,
    });
}
