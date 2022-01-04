import { Transforms } from 'slate';
import type { Editor } from 'slate';

import { isLoaderElement } from '#modules/editor-v4-loader';

export function withoutLoaderBlocks(editor: Editor): void {
    Transforms.removeNodes(editor, {
        at: [],
        match: isLoaderElement,
    });
}
