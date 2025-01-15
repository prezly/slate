import type { Range, SlateEditor } from '@udecode/plate';

export function getEditorRange(editor: SlateEditor): Range | undefined {
    // editor.children can sometimes be undefined, even though TypeScript says otherwise
    if (!editor.children || editor.children.length === 0) {
        return undefined;
    }

    return {
        anchor: editor.api.start([0]),
        focus: editor.api.end([editor.children.length - 1]),
    };
}
