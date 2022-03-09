import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

import { pick } from '#lodash';

export function updateImage(
    editor: Editor,
    props: Partial<Pick<ImageNode, 'file' | 'layout' | 'href'>>,
) {
    const changes = pick(props, ['file', 'layout', 'href']);

    Transforms.setNodes<ImageNode>(editor, changes, {
        match: isImageNode,
    });
}
