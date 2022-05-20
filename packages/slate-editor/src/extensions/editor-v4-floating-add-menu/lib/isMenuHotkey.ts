import type { KeyboardEventLike } from 'is-hotkey';
import { isHotkey } from 'is-hotkey';

export const MENU_TRIGGER_CHARACTERS = ['/', '/']; // Those are two different chars. KeyCode in order 191 and 111

export function isMenuHotkey(event: KeyboardEventLike) {
    return MENU_TRIGGER_CHARACTERS.some((triggerChar) =>
        isHotkey(`mod+${triggerChar}`, { byKey: true })(event),
    );
}
