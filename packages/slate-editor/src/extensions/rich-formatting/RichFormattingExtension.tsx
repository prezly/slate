import type { Extension } from '@prezly/slate-commons';
import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

import { Text } from './components';
import { createDeserialize } from './createDeserialize';
import { normalizeRedundantRichTextAttributes } from './lib';
import * as OnKeyDown from './onKeyDown';

export const EXTENSION_ID = 'RichFormattingExtension';

export const RichFormattingExtension = (): Extension => ({
    id: EXTENSION_ID,
    deserialize: createDeserialize(),
    normalizeNode: normalizeRedundantRichTextAttributes,
    onKeyDown: (event: KeyboardEvent, editor: Editor) => {
        OnKeyDown.onHotkeyDoMarks(event, editor);
        OnKeyDown.onBackspaceResetFormattingAtDocumentStart(event, editor);
    },
    renderLeaf: Text,
});
