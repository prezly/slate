import type { Extension } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';

const FLOATING_ADD_MENU_EXTENSION_ID = 'FloatingAddMenuExtension';

export const isMenuHotkey = isHotkey('mod+/');

export function FloatingAddMenuExtension(toggleMenu: (open?: boolean) => void): Extension {
    return {
        id: FLOATING_ADD_MENU_EXTENSION_ID,
        onKeyDown(event) {
            if (isMenuHotkey(event.nativeEvent)) {
                event.preventDefault();
                event.stopPropagation();
                toggleMenu();
            }
        },
    };
}
