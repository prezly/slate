import { isHotkey } from 'is-hotkey';

export const MENU_TRIGGER_CHARACTER = '/';

export const isMenuHotkey = isHotkey(`mod+${MENU_TRIGGER_CHARACTER}`, { byKey: true });
