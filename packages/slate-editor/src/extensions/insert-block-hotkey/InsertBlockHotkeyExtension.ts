import type { Extension } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';
import type { Element } from 'slate';

import { insertBlockAbove, insertBlockBelow } from './lib';

export const EXTENSION_ID = InsertBlockHotkeyExtension.name;

interface Parameters {
    createDefaultElement: (props?: Partial<Element>) => Element;
}

const isModEnter = isHotkey('mod+enter');
const isShiftModEnter = isHotkey('shift+mod+enter');

export function InsertBlockHotkeyExtension({ createDefaultElement }: Parameters): Extension {
    return {
        id: EXTENSION_ID,
        onKeyDown: (event, editor) => {
            if (isShiftModEnter(event) && insertBlockAbove(editor, createDefaultElement)) {
                event.preventDefault();
                return;
            }

            if (isModEnter(event) && insertBlockBelow(editor, createDefaultElement)) {
                event.preventDefault();
                return;
            }
        },
    };
}
