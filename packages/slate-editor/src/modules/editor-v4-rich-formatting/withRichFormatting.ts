/* eslint-disable no-param-reassign */

import { withLists, withListsReact } from '@prezly/slate-lists';
import { Editor } from 'slate';

import { withResetRichFormattingOnBreak } from './lib';
import { options } from './lists';

const withRichFormatting = <T extends Editor>(editor: T): T =>
    withResetRichFormattingOnBreak(withListsReact(withLists(options)(editor)));

export default withRichFormatting;
