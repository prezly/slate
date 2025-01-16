import type { SlateEditor } from '@udecode/plate-common';
import type { Range } from 'slate';

export function getEditorRange(editor: SlateEditor): Range | undefined {
    // editor.children can sometimes be undefined, even though TypeScript says otherwise
    if (!editor.children || editor.children.length === 0) {
        return undefined;
    }

    return {
        anchor: editor.start([0]),
        focus: editor.end([editor.children.length - 1]),
    };
}
