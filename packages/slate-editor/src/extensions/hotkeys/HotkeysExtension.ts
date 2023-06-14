import type { Extension } from '@prezly/slate-commons';

import { onEscBlurEditor } from './onKeyDown';

export const EXTENSION_ID = 'HotkeysExtension';

export function HotkeysExtension(): Extension {
    return {
        id: EXTENSION_ID,
        onKeyDown(event, editor) {
            return onEscBlurEditor(editor, event);
        },
    };
}
