import type { Extension } from '@prezly/slate-commons';
import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

import { Text } from './components';
import { createDeserialize } from './createDeserialize';
import { onHotkeyDoMarks } from './onKeyDown';

export const EXTENSION_ID = 'TextStylingExtension';

export function TextStylingExtension(): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: createDeserialize(),
        onKeyDown: (event: KeyboardEvent, editor: Editor) => {
            onHotkeyDoMarks(event, editor);
        },
        renderLeaf: Text,
    };
}
