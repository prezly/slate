import type { ListsEditor } from '@prezly/slate-lists';
import type { TableEditor } from '@prezly/slate-tables';
import type { ElementNode, TextNode } from '@prezly/slate-types';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

export * from './components';
export * as Icons from './icons';
export * from './modules/editor';
export { EditableWithExtensions } from './modules/editable';

export type { SearchProps as CoverageSearchProps } from './extensions/coverage';
export { createEmbed } from './extensions/embed';
export {
    type SearchProps as PressContactsSearchProps,
    JobDescription,
} from './extensions/press-contacts';
export type { User } from './extensions/user-mentions';
export { type ResultPromise, type UploadcareOptions, withUploadcare } from './modules/uploadcare';

import type { RichBlocksAwareEditor } from './modules/editor';

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor &
            ReactEditor &
            HistoryEditor &
            ListsEditor &
            RichBlocksAwareEditor &
            TableEditor;
        Element: ElementNode;
        Text: TextNode;
    }
}
