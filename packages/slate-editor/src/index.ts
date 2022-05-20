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
export * from './modules/editor';

export type { SearchProps as CoverageSearchProps } from './extensions/coverage';
export { createEmbed } from './extensions/embed';
export type { SearchProps as PressContactsSearchProps } from './extensions/press-contacts';
export { JobDescription } from './extensions/press-contacts';
export { ElementType as RichElementType } from './extensions/rich-formatting';
export type { User } from './extensions/user-mentions';

export type { ResultPromise, UploadcareOptions } from './modules/uploadcare';
export { withUploadcare } from './modules/uploadcare';
