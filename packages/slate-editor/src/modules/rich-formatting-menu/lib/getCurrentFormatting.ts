import { EditorCommands } from '@prezly/slate-commons';
import { uniq } from 'lodash-es';
import { Editor } from 'slate';


import type { Formatting, RichFormattedTextElement } from '../types';

import { findRichFormattingTextParent } from './findRichFormattingTextParent';

export function getCurrentFormatting(editor: Editor): Formatting | null {
    if (!editor.selection || !EditorCommands.isSelectionValid(editor)) {
        return null;
    }

    // Find the lowest nodes, work our way back to a RichFormattedTextElement parent.
    const leafNodes = Array.from(Editor.nodes(editor, { at: editor.selection, mode: 'lowest' }));
    const richTextBlocks = leafNodes
        .map((entry) => findRichFormattingTextParent(editor, entry))
        .filter((node): node is RichFormattedTextElement => Boolean(node));

    const blockTypes = uniq(richTextBlocks.map((node) => node.type));

    if (blockTypes.length === 0) {
        return null;
    }

    if (blockTypes.length > 1) {
        return 'multiple';
    }

    return blockTypes[0] as Formatting;
}
