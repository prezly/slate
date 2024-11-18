import type { SlateEditor } from '@udecode/plate-common';
import { getEditorString, getRangeBefore } from '@udecode/plate-common';
import type { Location } from 'slate';

export function isPreviousCharacterEmpty(editor: SlateEditor, at: Location) {
    const range = getRangeBefore(editor, at);
    if (range) {
        const text = getEditorString(editor, range);
        if (text) {
            const noWhiteSpaceRegex = new RegExp(`\\S+`);

            return !text.match(noWhiteSpaceRegex);
        }
    }

    return true;
}
