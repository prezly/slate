import isHotkey from 'is-hotkey';
import type { KeyboardEvent } from 'react';

const isDeletingForward = (event: KeyboardEvent): boolean =>
    isHotkey('delete', event.nativeEvent) ||
    isHotkey('mod+delete', event.nativeEvent) || // CTRL or CMD
    isHotkey('opt+delete', event.nativeEvent) || // ALT
    isHotkey('shift+delete', event.nativeEvent);

export default isDeletingForward;
