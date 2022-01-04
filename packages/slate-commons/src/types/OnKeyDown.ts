import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

export type OnKeyDown = (event: KeyboardEvent, editor: Editor, options?: any) => void;
