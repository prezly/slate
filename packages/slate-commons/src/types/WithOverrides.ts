import type { SlateEditor } from '@udecode/plate-common';

export type WithOverrides = <T extends SlateEditor>(editor: T) => T;
