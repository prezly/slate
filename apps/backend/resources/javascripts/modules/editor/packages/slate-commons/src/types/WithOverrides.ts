import type { HistoryEditor, SlateEditor } from '@udecode/plate-common';

export type WithOverrides = <T extends SlateEditor & HistoryEditor>(editor: T) => T;
