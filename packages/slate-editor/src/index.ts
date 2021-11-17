import type { BaseEditor } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { HistoryEditor } from 'slate-history';
import type { ElementNode, TextNode } from '@prezly/slate-types';

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: ElementNode;
        Text: TextNode;
    }
}

export * from './components';
export * from './lib';
export { default } from './modules/editor-v4';
export * from './modules/editor-v4';
export { SearchProps as CoverageSearchProps } from './modules/editor-v4-coverage';
export { createEmbed } from './modules/editor-v4-embed';
export {
    JobDescription,
    SearchProps as PressContactsSearchProps,
} from './modules/editor-v4-press-contacts';
export { ElementType as RichElementType } from './modules/editor-v4-rich-formatting';
export { ResultPromise, UploadcareOptions, withUploadcare } from './modules/editor-v4-uploadcare';
export { User } from './modules/editor-v4-user-mentions';
