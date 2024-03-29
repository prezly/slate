import { getRangeBefore, getText } from '@udecode/plate-core';
import type { Editor, Location } from 'slate';

export function isPreviousCharacterEmpty(editor: Editor, at: Location) {
    const range = getRangeBefore(editor, at);
    if (range) {
        const text = getText(editor, range);
        if (text) {
            const noWhiteSpaceRegex = new RegExp(`\\S+`);

            return !text.match(noWhiteSpaceRegex);
        }
    }

    return true;
}
