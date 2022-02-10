import { isLinkNode } from '@prezly/slate-types';
import { Editor, Node, Path } from 'slate';
import { Range } from 'slate';

export function isCursorAtEndOfLink(editor: Editor): boolean {
    if (!editor.selection) return false;
    if (!Range.isCollapsed(editor.selection)) return false;

    const cursor = editor.selection.focus;

    const link = Editor.above(editor, { at: cursor, match: isLinkNode });
    if (!link) return false;

    const relativeCursorPath = Path.relative(cursor.path, link[1]);

    const [tail] = [
        ...Node.texts(link[0], { reverse: true, from: relativeCursorPath, to: relativeCursorPath }),
    ];

    return Path.equals(relativeCursorPath, tail[1]) && cursor.offset === tail[0].text.length;
}
