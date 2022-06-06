import { EditorCommands } from '@prezly/slate-commons';
import type { QuoteNode } from '@prezly/slate-types';
import { isHeadingNode, isQuoteNode } from '@prezly/slate-types';
import type { Node } from 'slate';
import { Editor, Path } from 'slate';

import { uniq } from '#lodash';

import type { RichTextElementType } from '#extensions/rich-formatting';
import { isRichTextBlockElement } from '#extensions/rich-formatting';

import type { Formatting } from '../types';

const ROOT_PATH: Path = [];

function findParentBlock(
    editor: Editor,
    node: Node,
    path: Path,
): RichTextElementType | QuoteNode | null {
    if (isRichTextBlockElement(node) || isHeadingNode(node) || isQuoteNode(node)) {
        return node;
    }

    if (Path.equals(path, ROOT_PATH)) {
        return null;
    }

    const [ancestor, ancestorPath] = Editor.parent(editor, path);
    return findParentBlock(editor, ancestor, ancestorPath);
}

export function getCurrentFormatting(editor: Editor): Formatting | null {
    if (!editor.selection || !EditorCommands.isSelectionValid(editor)) {
        return null;
    }

    // Find lowest nodes, work our way back to a RichTextElementType parent.
    const leafNodes = Array.from(Editor.nodes(editor, { at: editor.selection, mode: 'lowest' }));
    const richTextBlocks = leafNodes
        .map(([node, path]) => findParentBlock(editor, node, path))
        .filter<RichTextElementType>(isRichTextBlockElement);

    const blockTypes = uniq(richTextBlocks.map((node) => node.type));

    if (blockTypes.length === 0) {
        return null;
    }

    if (blockTypes.length > 1) {
        return 'multiple';
    }

    return blockTypes[0] as Formatting;
}
