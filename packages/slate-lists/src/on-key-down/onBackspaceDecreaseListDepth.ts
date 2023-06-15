import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { ReactEditor } from 'slate-react';

import { canDeleteBackward } from '../lib';
import { decreaseDepth } from '../transformations';
import type { ListsEditor } from '../types';

type Editor = ListsEditor & ReactEditor;

export function onBackspaceDecreaseListDepth(editor: Editor, event: KeyboardEvent) {
    if (isHotkey('backspace', event.nativeEvent) && !canDeleteBackward(editor)) {
        event.preventDefault();
        return decreaseDepth(editor);
    }
    return false;
}
