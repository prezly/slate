import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

function isDeletingForward(event: KeyboardEvent): boolean {
    return (
        isHotkey('delete', event.nativeEvent) ||
        isHotkey('mod+delete', event.nativeEvent) || // CTRL or CMD
        isHotkey('opt+delete', event.nativeEvent) || // ALT
        isHotkey('shift+delete', event.nativeEvent)
    );
}

export default isDeletingForward;
