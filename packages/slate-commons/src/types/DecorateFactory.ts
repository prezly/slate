import type { Editor } from 'slate';

import type { Decorate } from './Decorate';
import type { Extension } from './Extension';

export type DecorateFactory = <E extends Editor, X extends Extension>(
    editor: E,
    extension: X,
) => Decorate;
