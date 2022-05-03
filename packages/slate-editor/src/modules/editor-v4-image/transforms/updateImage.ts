import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { pick } from '#lodash';

export function updateImage(
    editor: Editor,
    props: Partial<Pick<ImageNode, 'align' | 'file' | 'layout' | 'href' | 'width' | 'new_tab'>>,
) {
    const changes = pick(props, ['align', 'file', 'layout', 'href', 'width', 'new_tab']);

    Transforms.setNodes<ImageNode>(editor, changes, {
        match: isImageNode,
    });
}
