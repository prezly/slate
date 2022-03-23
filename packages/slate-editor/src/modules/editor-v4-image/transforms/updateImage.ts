import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { pick } from '#lodash';

export function updateImage(
    editor: Editor,
    props: Partial<Pick<ImageNode, 'file' | 'layout' | 'href' | 'width'>>,
) {
    const changes = pick(props, ['file', 'layout', 'href', 'width']);

    Transforms.setNodes<ImageNode>(editor, changes, {
        match: isImageNode,
    });
}
