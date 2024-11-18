import type { SlateEditor } from '@udecode/plate-common';
import { blurEditor } from '@udecode/slate-react';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

export function onEscBlurEditor(editor: SlateEditor, event: KeyboardEvent) {
    if (isHotkey('esc', event.nativeEvent)) {
        event.preventDefault();
        blurEditor(editor);
        return true;
    }
    return false;
}
