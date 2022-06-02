import type { ListsEditor } from '@prezly/slate-lists';
import type { ElementNode, TextNode } from '@prezly/slate-types';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';
import type { TableEditor } from 'slate-tables/lib';
import type { TableCellNode, TableNode, TableRowNode } from 'slate-tables/lib/nodes';

export interface MyTableNode extends TableNode {
    type: 'table';
}

export interface MyTableRowNode extends TableRowNode {
    type: 'table-row';
}

export interface MyTableCellNode extends TableCellNode {
    type: 'table-cell';
}

export * from './components';
export * as Icons from './icons';
export * from './modules/editor';
export { EditableWithExtensions } from './modules/editable';

export type { SearchProps as CoverageSearchProps } from './extensions/coverage';
export { createEmbed } from './extensions/embed';
export type { SearchProps as PressContactsSearchProps } from './extensions/press-contacts';
export { JobDescription } from './extensions/press-contacts';
export { ElementType as RichElementType } from './extensions/rich-formatting';
export type { User } from './extensions/user-mentions';

export type { ResultPromise, UploadcareOptions } from './modules/uploadcare';
export { withUploadcare } from './modules/uploadcare';

import type { RichBlocksAwareEditor } from './modules/editor';

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor & ListsEditor & RichBlocksAwareEditor & TableEditor;
        Element: ElementNode & MyTableNode & MyTableRowNode & MyTableCellNode;
        Text: TextNode;
    }
}
