import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

export type WithOverrides = <T extends BaseEditor & HistoryEditor & ReactEditor>(editor: T) => T;
