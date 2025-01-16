import { RangeApi, type SlateEditor } from '@udecode/plate';

import { isSelectionValid } from './isSelectionValid';

export function isSelectionEmpty(editor: SlateEditor): boolean {
    if (!editor.selection || !isSelectionValid(editor)) {
        return true;
    }

    return RangeApi.isCollapsed(editor.selection) && editor.api.string(editor.selection) === '';
}
