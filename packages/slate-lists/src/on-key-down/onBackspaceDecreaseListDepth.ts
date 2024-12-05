import type { SlateEditor } from '@udecode/plate-common';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

import { isDeleteBackwardAllowed } from '../lib';
import { ListsEditor } from '../ListsEditor';
import { decreaseDepth } from '../transformations';

export function onBackspaceDecreaseListDepth(editor: SlateEditor, event: KeyboardEvent) {
    const schema = ListsEditor.getListsSchema(editor);
    if (
        schema &&
        isHotkey('backspace', event.nativeEvent) &&
        !isDeleteBackwardAllowed(editor, schema)
    ) {
        event.preventDefault();
        return decreaseDepth(editor, schema);
    }
    return false;
}
