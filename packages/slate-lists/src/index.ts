import type { ElementNode, TextNode } from '@prezly/slate-types';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: ElementNode;
        Text: TextNode;
    }
}

export * from './lib';
export { Lists } from './Lists';
export * from './types';
export { withLists } from './withLists';
export { withListsReact } from './withListsReact';
