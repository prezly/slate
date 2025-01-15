import type { SlateEditor } from '@udecode/plate';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

export function onEscBlurEditor(editor: SlateEditor, event: KeyboardEvent) {
    if (isHotkey('esc', event.nativeEvent)) {
        event.preventDefault();
        editor.tf.blur();
        return true;
    }
    return false;
}
