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

interface Parameters {
    onOpen: (trigger: 'hotkey' | 'input') => void;
}

export function FloatingAddMenuExtension({ onOpen }: Parameters): Extension {
    return {
        id: EXTENSION_ID,
        onKeyDown(event, editor) {
            if (isMenuHotkey(event) && shouldShowMenuButton(editor)) {
                event.preventDefault();
                event.stopPropagation();
                onOpen('hotkey');
                return;
            }

            if (isTriggerInput(event) && shouldShowMenuButton(editor)) {
                onOpen('input');
                return;
            }
        },
    };
}
