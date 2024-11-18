import { isLinkNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import { Node, Path, Range } from 'slate';

const isEscapingLink = isHotkey(['space', '.']);

/**
 * Allow escaping links if certain characters are typed at the right boundary of it.
 *
 * @see MT-4667
 */
export function escapeLinksBoundaries(event: KeyboardEvent, editor: SlateEditor) {
    if (isEscapingLink(event) && isCursorAtEndOfLink(editor)) {
        const next = editor.next({ at: editor.selection?.focus });
        if (next) {
            event.preventDefault();
            editor.insertText(event.key, { at: { path: next[1], offset: 0 } });
            editor.select({ path: next[1], offset: 1 });
        }
    }
}

function isCursorAtEndOfLink(editor: SlateEditor): boolean {
    if (!editor.selection) return false;
    if (!Range.isCollapsed(editor.selection)) return false;

    const cursor = editor.selection.focus;

    const link = editor.above({ at: cursor, match: isLinkNode });
    if (!link) return false;

    const relativeCursorPath = Path.relative(cursor.path, link[1]);

    const [tail] = [...Node.texts(link[0], { reverse: true, to: relativeCursorPath })];

    return Path.equals(relativeCursorPath, tail[1]) && cursor.offset === tail[0].text.length;
}
