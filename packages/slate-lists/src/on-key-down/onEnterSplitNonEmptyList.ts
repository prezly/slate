import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { ReactEditor } from 'slate-react';

import { getListItemsInRange } from '../lib';
import { splitListItem } from '../transformations';
import type { ListsEditor } from '../types';

type Editor = ListsEditor & ReactEditor;

export function onEnterSplitNonEmptyList(editor: Editor, event: KeyboardEvent) {
    if (isHotkey('enter', event.nativeEvent)) {
        const listItemsInSelection = getListItemsInRange(editor, editor.selection);
        if (listItemsInSelection.length > 0) {
            event.preventDefault();
            return splitListItem(editor);
        }
    }
    return false;
}
