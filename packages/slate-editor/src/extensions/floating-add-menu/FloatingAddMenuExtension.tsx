import type { Extension } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

import { isMenuHotkey, MENU_TRIGGER_CHARACTERS, shouldShowMenuButton } from './lib';

function isTriggerInput(event: KeyboardEvent) {
    return MENU_TRIGGER_CHARACTERS.some((tiggerKey) =>
        isHotkey(tiggerKey, { byKey: true }, event.nativeEvent),
    );
}

export const EXTENSION_ID = 'FloatingAddMenuExtension';

export function FloatingAddMenuExtension(toggleMenu: (open: boolean) => void): Extension {
    return {
        id: EXTENSION_ID,
        onKeyDown(event, editor) {
            if (isMenuHotkey(event) && shouldShowMenuButton(editor)) {
                event.preventDefault();
                event.stopPropagation();
                toggleMenu(true);
                return;
            }

            if (isTriggerInput(event) && shouldShowMenuButton(editor)) {
                toggleMenu(true);
                return;
            }
        },
    };
}
