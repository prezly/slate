import isHotkey from 'is-hotkey';
import { KeyboardEvent } from 'react';

const isDeletingBackward = (event: KeyboardEvent): boolean =>
    isHotkey('backspace', event.nativeEvent) ||
    isHotkey('mod+backspace', event.nativeEvent) || // CTRL or CMD
    isHotkey('opt+backspace', event.nativeEvent) || // ALT
    isHotkey('shift+backspace', event.nativeEvent);

export default isDeletingBackward;
