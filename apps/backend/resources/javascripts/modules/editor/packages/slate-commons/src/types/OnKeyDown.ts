import type { SlateEditor } from '@udecode/plate';
import type { KeyboardEvent } from 'react';

export type OnKeyDown = (
    event: KeyboardEvent,
    editor: SlateEditor,
    options?: any,
) => boolean | void;
