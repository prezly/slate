import type { Extension } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';

import { isMenuHotkey, MENU_TRIGGER_CHARACTER, shouldShowMenuButton } from './lib';

const isTriggerHotkey = isHotkey(`shift?+${MENU_TRIGGER_CHARACTER}`, { byKey: true });

export const EXTENSION_ID = 'FloatingAddMenuExtension';

interface Parameters {
    onOpen: (trigger: 'hotkey' | 'input') => void;
}

export function FloatingAddMenuExtension({ onOpen }: Parameters): Extension {
    return {
        id: EXTENSION_ID,
        onKeyDown(event, editor) {
            if (isMenuHotkey(event) && shouldShowMenuButton(editor)) {
                onOpen('hotkey');
                return true;
            }

            if (isTriggerHotkey(event) && shouldShowMenuButton(editor)) {
                onOpen('input');
                // not returning true intentionally
            }
            return false;
        },
    };
}
