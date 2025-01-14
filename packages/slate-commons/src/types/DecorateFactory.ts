import type { SlateEditor } from '@udecode/plate-common';

import type { Decorate } from './Decorate';

export type DecorateFactory = <E extends SlateEditor>(editor: E) => Decorate;
