import type { Editor } from 'slate';

import type { Decorate } from './Decorate';

export type DecorateFactory = <E extends Editor>(editor: E) => Decorate;
