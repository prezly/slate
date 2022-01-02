/* eslint-disable no-param-reassign */

import { withLists, withListsReact } from '@prezly/slate-lists';
import type { Editor } from 'slate';

import { withResetRichFormattingOnBreak } from './lib';
import { options } from './lists';

export function withRichFormatting<T extends Editor>(editor: T): T {
    return withResetRichFormattingOnBreak(withListsReact(withLists(options)(editor)));
}

