import { EditorCommands } from '@prezly/slate-commons';
import type { Node } from 'slate';
import { Editor, Path } from 'slate';

import { uniq } from '#lodash';

import type { BlockType, RichTextElementType } from '../types';

import isRichTextBlockElement from './isRichTextBlockElement';

const ROOT_PATH: Path = [];

const findParentBlock = (editor: Editor, node: Node, path: Path): RichTextElementType | null => {
    if (isRichTextBlockElement(node)) {
        return node;
    }

    if (Path.equals(path, ROOT_PATH)) {
        return null;
    }

    const [ancestor, ancestorPath] = Editor.parent(editor, path);
    return findParentBlock(editor, ancestor, ancestorPath);
};

const getRichFormattingBlockNodeType = (editor: Editor): BlockType | null => {
    if (!editor.selection || !EditorCommands.isSelectionValid(editor)) {
        return null;
    }

    // Find lowest nodes, work our way back to a RichTextElementType parent.
    const leafNodes = Array.from(Editor.nodes(editor, { at: editor.selection, mode: 'lowest' }));
    const richTextBlocks = leafNodes
        .map(([node, path]) => findParentBlock(editor, node, path))
        .filter<RichTextElementType>(isRichTextBlockElement);

    const [blockType = null, ...otherTypes] = uniq(richTextBlocks.map((node) => node.type));

    if (otherTypes.length > 0) {
        return 'multiple';
    }

    return blockType as BlockType | null;
};

export default getRichFormattingBlockNodeType;
