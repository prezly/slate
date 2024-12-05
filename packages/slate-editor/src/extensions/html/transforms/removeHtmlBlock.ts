import { EditorCommands } from '@prezly/slate-commons';
import { isHtmlNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

export function removeHtmlBlock(editor: SlateEditor): void {
    EditorCommands.removeNode(editor, {
        match: isHtmlNode,
    });
}
