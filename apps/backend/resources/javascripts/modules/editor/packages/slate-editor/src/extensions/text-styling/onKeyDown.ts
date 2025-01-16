import { EditorCommands } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

import { MarkType } from './types';

const MARK_HOTKEYS = [
    { checkHotkey: isHotkey('mod+b'), mark: MarkType.BOLD },
    { checkHotkey: isHotkey('mod+i'), mark: MarkType.ITALIC },
    { checkHotkey: isHotkey('mod+u'), mark: MarkType.UNDERLINED },
];

export function onKeyDown(event: KeyboardEvent, editor: SlateEditor) {
    for (const { checkHotkey, mark } of MARK_HOTKEYS) {
        if (checkHotkey(event.nativeEvent)) {
            event.preventDefault();
            EditorCommands.toggleMark(editor, mark);
            return true;
        }
    }
    return false;
}
