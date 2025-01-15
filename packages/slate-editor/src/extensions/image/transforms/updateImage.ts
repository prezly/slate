import type { ImageNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function updateImage(
    editor: SlateEditor,
    image: ImageNode,
    patch: Partial<Pick<ImageNode, 'align' | 'file' | 'layout' | 'href' | 'width' | 'new_tab'>>,
) {
    editor.tf.setNodes<ImageNode>(patch, {
        at: [],
        match: (node) => node === image,
    });
}
