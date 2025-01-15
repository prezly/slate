import type { SlateEditor } from '@udecode/plate';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

import { ListsEditor } from '../ListsEditor';
import { decreaseDepth } from '../transformations';

export function onShiftTabDecreaseListDepth(editor: SlateEditor, event: KeyboardEvent) {
    const schema = ListsEditor.getListsSchema(editor);
    if (schema && isHotkey('shift+tab', event.nativeEvent)) {
        event.preventDefault();
        return decreaseDepth(editor, schema);
    }
    return false;
}
