import { EditorCommands } from '@prezly/slate-commons';
import type { HeadingNode } from '@prezly/slate-types';
import { isAlignableElement } from '@prezly/slate-types';
import type { Editor, NodeEntry } from 'slate';

import { isRichTextElement } from './isRichTextElement';

const shape: { [P in keyof HeadingNode]: true } = {
    type: true,
    align: true,
    children: true,
};

const ALIGNABLE_NODE_ATTRIBUTES = Object.keys(shape);
const NON_ALIGNABLE_NODE_ATTRIBUTES = ALIGNABLE_NODE_ATTRIBUTES.filter((attr) => attr !== 'align');

export function normalizeRedundantRichTextAttributes(
    editor: Editor,
    [node, path]: NodeEntry,
): boolean {
    if (!isRichTextElement(node)) {
        return false;
    }

    if (isAlignableElement(node)) {
        return EditorCommands.normalizeRedundantAttributes(
            editor,
            [node, path],
            ALIGNABLE_NODE_ATTRIBUTES,
        );
    }

    return EditorCommands.normalizeRedundantAttributes(
        editor,
        [node, path],
        NON_ALIGNABLE_NODE_ATTRIBUTES,
    );
}
