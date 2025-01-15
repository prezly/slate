import type { Extension } from '@prezly/slate-commons';
import { noop } from '@technically/lodash';
import type { Element, SlateEditor } from '@udecode/plate';
import { isHotkey } from 'is-hotkey';

import { insertBlockAbove, insertBlockBelow } from './lib';

export const EXTENSION_ID = InsertBlockHotkeyExtension.name;

const isModEnter = isHotkey('mod+enter');
const isShiftModEnter = isHotkey('shift+mod+enter');

interface Parameters {
    createDefaultElement: (props?: Partial<Element>) => Element;
    onInserted?: (editor: SlateEditor) => void;
}

export function InsertBlockHotkeyExtension({
    createDefaultElement,
    onInserted = noop,
}: Parameters): Extension {
    return {
        id: EXTENSION_ID,
        onKeyDown: (event, editor) => {
            if (isShiftModEnter(event) && insertBlockAbove(editor, createDefaultElement)) {
                onInserted(editor);
                return true;
            }

            if (isModEnter(event) && insertBlockBelow(editor, createDefaultElement)) {
                onInserted(editor);
                return true;
            }
            return false;
        },
    };
}
