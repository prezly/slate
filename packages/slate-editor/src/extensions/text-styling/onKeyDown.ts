import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

import { MarkType } from './types';

const MARK_HOTKEYS = [
    { checkHotkey: isHotkey('mod+b'), mark: MarkType.BOLD },
    { checkHotkey: isHotkey('mod+i'), mark: MarkType.ITALIC },
    { checkHotkey: isHotkey('mod+u'), mark: MarkType.UNDERLINED },
];

export function onKeyDown(event: KeyboardEvent, editor: Editor) {
    for (const { checkHotkey, mark } of MARK_HOTKEYS) {
        if (checkHotkey(event.nativeEvent)) {
            event.preventDefault();
            EditorCommands.toggleMark(editor, mark);
            return true;
        }
    }
    return false;
}
