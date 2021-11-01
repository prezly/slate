export * from './constants';
export * from './lib';
export * from './nodes';
export * from './sdk';

import type { BaseEditor } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { HistoryEditor } from 'slate-history';

import { ElementNode, TextNode } from './nodes';

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: ElementNode;
        Text: TextNode;
    }
}
