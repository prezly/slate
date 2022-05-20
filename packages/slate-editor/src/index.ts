import type { ListsEditor } from '@prezly/slate-lists';
import type { ElementNode, TextNode } from '@prezly/slate-types';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor & ListsEditor;
        Element: ElementNode;
        Text: TextNode;
    }
}

export * from './components';
export * from './lib';
export * as Icons from './icons';
export * from './modules/editor-v4';

export type { SearchProps as CoverageSearchProps } from './extensions/editor-v4-coverage';
export { createEmbed } from './extensions/editor-v4-embed';
export type { SearchProps as PressContactsSearchProps } from './extensions/editor-v4-press-contacts';
export { JobDescription } from './extensions/editor-v4-press-contacts';
export { ElementType as RichElementType } from './extensions/editor-v4-rich-formatting';
export type { User } from './extensions/editor-v4-user-mentions';

export type { ResultPromise, UploadcareOptions } from './modules/editor-v4-uploadcare';
export { withUploadcare } from './modules/editor-v4-uploadcare';
