import type { PlateEditor } from '@udecode/plate-core';
import { getParent, isElement, isType } from '@udecode/plate-core';
import { unwrapList, toggleList } from '@udecode/plate-list';
import type { Editor } from 'slate';

export function clearBlockFormat(editor: Editor): void {
    unwrapList(editor as PlateEditor);
}

export const ELEMENT_CODE_BLOCK = 'code_block';
export const ELEMENT_CODE_LINE = 'code_line';

export function format(editor: Editor, customFormatting: any) {
    if (editor.selection) {
        const parentEntry = getParent(editor, editor.selection);
        if (!parentEntry) return;
        const [node] = parentEntry;
        if (
            isElement(node) &&
            !isType(editor as PlateEditor, node, ELEMENT_CODE_BLOCK) &&
            !isType(editor as PlateEditor, node, ELEMENT_CODE_LINE)
        ) {
            customFormatting();
        }
    }
}

export function formatList(editor: Editor, elementType: string) {
    format(editor, () =>
        toggleList(editor as PlateEditor, {
            type: elementType,
        }),
    );
}

export function formatText(editor: Editor, text: string) {
    format(editor, () => editor.insertText(text));
}
