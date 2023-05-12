import { EditorCommands } from '@prezly/slate-commons';
import { isNotNull } from '@technically/is-not-null';
import { uniq } from '@technically/lodash';
import { Editor } from 'slate';

import type { Formatting } from '../types';

import { findRichFormattingTextParent } from './findRichFormattingTextParent';

export function getCurrentFormatting(editor: Editor): Formatting | null {
    if (!editor.selection || !EditorCommands.isSelectionValid(editor)) {
        return null;
    }

    // Find the lowest nodes, work our way back to a RichFormattedTextElement parent.
    const leafNodes = Array.from(Editor.nodes(editor, { at: editor.selection, mode: 'lowest' }));
    const richTextBlocks = leafNodes
        .map((entry) => findRichFormattingTextParent(editor, entry))
        .filter(isNotNull);

    const blockTypes = uniq(richTextBlocks.map((node) => node.type));

    if (blockTypes.length === 0) {
        return null;
    }

    if (blockTypes.length > 1) {
        return 'multiple';
    }

    return blockTypes[0] as Formatting;
}
