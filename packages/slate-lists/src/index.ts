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
export { default as Lists } from './Lists';
export * from './types';
export { default as withLists } from './withLists';
export { default as withListsReact } from './withListsReact';
