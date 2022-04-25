import type { Editor } from 'slate';

export type WithOverrides = <T extends Editor>(editor: T) => T;
