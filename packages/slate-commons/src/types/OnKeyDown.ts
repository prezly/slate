import type { KeyboardEvent } from 'react';
import type { Editor } from 'slate';

type OnKeyDown = (event: KeyboardEvent, editor: Editor, options?: any) => void;

// eslint-disable-next-line no-undef
export default OnKeyDown;
