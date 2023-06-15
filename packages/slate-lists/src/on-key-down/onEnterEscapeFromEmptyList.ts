import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

import { isCursorInEmptyListItem } from '../lib';
import { ListsEditor } from '../ListsEditor';
import { decreaseDepth } from '../transformations';

export function onEnterEscapeFromEmptyList(editor: Editor, event: KeyboardEvent) {
    const schema = ListsEditor.getListsSchema(editor);
    if (schema && isHotkey('enter', event.nativeEvent)) {
        if (isCursorInEmptyListItem(editor, schema)) {
            event.preventDefault();
            return decreaseDepth(editor, schema);
        }
    }
    return false;
}
