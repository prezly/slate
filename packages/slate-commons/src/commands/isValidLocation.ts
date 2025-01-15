import { NodeApi, type Location, type SlateEditor } from '@udecode/plate';

export function isValidLocation(editor: SlateEditor, location: Location): boolean {
    try {
        return NodeApi.has(editor, editor.api.path(location));
    } catch {
        return false;
    }
}
