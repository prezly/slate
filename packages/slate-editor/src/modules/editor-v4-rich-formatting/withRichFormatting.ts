/* eslint-disable no-param-reassign */

import { withLists, withListsReact } from '@prezly/slate-lists';
import { ReactEditor } from 'slate-react';

import { withResetRichFormattingOnBreak } from './lib';
import { options } from './lists';

const withRichFormatting = <T extends ReactEditor>(editor: T): T =>
    withResetRichFormattingOnBreak(withListsReact(withLists(options)(editor)));

export default withRichFormatting;
