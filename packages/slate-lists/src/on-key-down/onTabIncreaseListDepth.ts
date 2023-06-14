import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { ReactEditor } from 'slate-react';

import { increaseDepth } from '../transformations';
import type { ListsEditor } from '../types';

type Editor = ListsEditor & ReactEditor;

export function onTabIncreaseListDepth(editor: Editor, event: KeyboardEvent) {
    if (isHotkey('tab', event.nativeEvent)) {
        event.preventDefault();
        return increaseDepth(editor);
    }
    return false;
}
