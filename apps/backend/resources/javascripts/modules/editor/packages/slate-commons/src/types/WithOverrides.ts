import type { SlateEditor } from '@udecode/plate';

export type WithOverrides = <T extends SlateEditor>(editor: T) => T;
