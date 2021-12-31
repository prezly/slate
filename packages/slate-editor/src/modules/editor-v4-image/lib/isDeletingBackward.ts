import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

function isDeletingBackward(event: KeyboardEvent): boolean {
    return (
        isHotkey('backspace', event.nativeEvent) ||
        isHotkey('mod+backspace', event.nativeEvent) || // CTRL or CMD
        isHotkey('opt+backspace', event.nativeEvent) || // ALT
        isHotkey('shift+backspace', event.nativeEvent)
    );
}

export default isDeletingBackward;
