import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

export function isDeletingEventBackward(event: KeyboardEvent): boolean {
    return (
        isHotkey('backspace', event.nativeEvent) ||
        isHotkey('mod+backspace', event.nativeEvent) || // CTRL or CMD
        isHotkey('opt+backspace', event.nativeEvent) || // ALT
        isHotkey('shift+backspace', event.nativeEvent)
    );
}

export function isDeletingEventForward(event: KeyboardEvent): boolean {
    return (
        isHotkey('delete', event.nativeEvent) ||
        isHotkey('mod+delete', event.nativeEvent) || // CTRL or CMD
        isHotkey('opt+delete', event.nativeEvent) || // ALT
        isHotkey('shift+delete', event.nativeEvent)
    );
}

export function isDeletingEvent(event: KeyboardEvent) {
    return isDeletingEventBackward(event) || isDeletingEventForward(event);
}
