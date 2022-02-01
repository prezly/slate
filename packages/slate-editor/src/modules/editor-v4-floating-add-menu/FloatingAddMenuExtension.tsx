import type { Extension } from '@prezly/slate-commons';
import { EditorCommands } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { KeyboardEvent } from 'react';

import { isMenuHotkey, MENU_TRIGGER_CHARACTER } from './lib';

const FLOATING_ADD_MENU_EXTENSION_ID = 'FloatingAddMenuExtension';

function isTriggerInput(event: KeyboardEvent) {
    return isHotkey(MENU_TRIGGER_CHARACTER, event.nativeEvent);
}

export function FloatingAddMenuExtension(toggleMenu: (open?: boolean) => void): Extension {
    return {
        id: FLOATING_ADD_MENU_EXTENSION_ID,
        onKeyDown(event, editor) {
            if (isMenuHotkey(event)) {
                event.preventDefault();
                event.stopPropagation();
                toggleMenu();
                return;
            }

            if (
                isTriggerInput(event) &&
                EditorCommands.isCursorInEmptyParagraph(editor, { ignoreWhitespace: true })
            ) {
                toggleMenu();
                return;
            }
        },
    };
}
