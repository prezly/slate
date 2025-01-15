import { isLinkNode } from '@prezly/slate-types';
import { NodeApi, PathApi, RangeApi, type SlateEditor } from '@udecode/plate';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

const isEscapingLink = isHotkey(['space', '.']);

/**
 * Allow escaping links if certain characters are typed at the right boundary of it.
 *
 * @see MT-4667
 */
export function escapeLinksBoundaries(event: KeyboardEvent, editor: SlateEditor) {
    if (isEscapingLink(event) && isCursorAtEndOfLink(editor)) {
        const next = editor.api.next({ at: editor.selection?.focus });
        if (next) {
            event.preventDefault();
            editor.tf.insertText(event.key, { at: { path: next[1], offset: 0 } });
            editor.tf.select({ path: next[1], offset: 1 });
        }
    }
}

function isCursorAtEndOfLink(editor: SlateEditor): boolean {
    if (!editor.selection) return false;
    if (!RangeApi.isCollapsed(editor.selection)) return false;

    const cursor = editor.selection.focus;

    const link = editor.api.above({ at: cursor, match: isLinkNode });
    if (!link) return false;

    const relativeCursorPath = PathApi.relative(cursor.path, link[1]);

    const [tail] = [...NodeApi.texts(link[0], { reverse: true, to: relativeCursorPath })];

    return PathApi.equals(relativeCursorPath, tail[1]) && cursor.offset === tail[0].text.length;
}
