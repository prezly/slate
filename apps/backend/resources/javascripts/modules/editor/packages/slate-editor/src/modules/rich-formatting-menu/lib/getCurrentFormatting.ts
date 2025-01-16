import { EditorCommands } from '@prezly/slate-commons';
import { isHeadingNode } from '@prezly/slate-types';
import { isNotNull } from '@technically/is-not-null';
import { uniq } from '@technically/lodash';
import type { SlateEditor } from '@udecode/plate';

import type { Formatting } from '../types';

import { findRichFormattingTextParent } from './findRichFormattingTextParent';

export function getCurrentFormatting(editor: SlateEditor): {
    aggregate: Formatting;
    active: Formatting[];
} {
    if (!editor.selection || !EditorCommands.isSelectionValid(editor)) {
        return { aggregate: 'unknown', active: [] };
    }

    // Find the lowest nodes, work our way back to a RichFormattedTextElement parent.
    const leafNodes = Array.from(editor.api.nodes({ at: editor.selection, mode: 'lowest' }));
    const richTextBlocks = leafNodes
        .map((entry) => findRichFormattingTextParent(editor, entry))
        .filter(isNotNull);

    const active = uniq(
        richTextBlocks.map((node) => (isHeadingNode(node) ? node.role ?? node.type : node.type)),
    );

    if (active.length === 0) {
        return { aggregate: 'unknown', active: [] };
    }

    if (active.length > 1) {
        return { aggregate: 'multiple', active: active };
    }

    return { aggregate: active[0], active: active };
}
