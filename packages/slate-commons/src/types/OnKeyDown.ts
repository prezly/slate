import type { SlateEditor } from '@udecode/plate-common';
import type { KeyboardEvent } from 'react';

export type OnKeyDown = (event: KeyboardEvent, editor: SlateEditor, options?: any) => boolean | void;
