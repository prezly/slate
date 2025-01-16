import type { Point, SlateEditor } from '@udecode/plate';

import { getText } from './getText';

// Starts with whitespace char or nothing
const AFTER_MATCH_REGEX = /^(\s|$)/;

/**
 * Is a point at the end of a word
 */
export function isPointAtWordEnd(editor: SlateEditor, { at }: { at: Point }): boolean {
    // Point after at
    const after = editor.api.after(at);

    // From at to after
    const afterRange = editor.api.range(at, after);
    if (!afterRange) {
        return false;
    }

    const afterText = getText(editor, afterRange);

    // Match regex on after text
    return AFTER_MATCH_REGEX.test(afterText);
}
