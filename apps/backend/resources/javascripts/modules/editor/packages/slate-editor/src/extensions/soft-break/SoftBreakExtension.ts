import type { Extension } from '@prezly/slate-commons';
import { isHotkey } from 'is-hotkey';

export const EXTENSION_ID = 'SoftBreakExtension';

const isShiftEnter = isHotkey('shift+enter');

export function SoftBreakExtension(): Extension {
    return {
        id: EXTENSION_ID,
        onKeyDown(event, editor) {
            if (isShiftEnter(event.nativeEvent) && !event.isDefaultPrevented()) {
                editor.insertText('\n');
                return true;
            }
            return false;
        },
    };
}
