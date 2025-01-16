import type { SlateEditor } from '@udecode/plate-common';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

import { isAtEmptyListItem } from '../lib';
import { ListsEditor } from '../ListsEditor';
import { decreaseDepth } from '../transformations';

export function onEnterEscapeFromEmptyList(editor: SlateEditor, event: KeyboardEvent) {
    const schema = ListsEditor.getListsSchema(editor);
    if (schema && isHotkey('enter', event.nativeEvent)) {
        if (isAtEmptyListItem(editor, schema)) {
            event.preventDefault();
            return decreaseDepth(editor, schema);
        }
    }
    return false;
}
