import type { ElementNode, ParagraphNode, TextNode } from '@prezly/slate-types';
import type { BaseEditor, Node } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

export * from '@prezly/slate-types';
export * from './components';
export * as Icons from './icons';
export * from './modules/editor';
export { EditableWithExtensions } from './modules/editable';

export { type SearchProps as CoverageSearchProps, createCoverage } from './extensions/coverage';
export { createEmbed } from './extensions/embed';
export { type PlaceholdersExtensionParameters, PlaceholderNode } from './extensions/placeholders';
export {
    type SearchProps as PressContactsSearchProps,
    createPressContact,
    JobDescription,
} from './extensions/press-contacts';
export type { User } from './extensions/user-mentions';
export { type ResultPromise, type UploadcareOptions, withUploadcare } from './modules/uploadcare';

import type {
    DefaultTextBlockEditor,
    RichBlocksAwareEditor,
    SerializingEditor,
} from './modules/editor';

export interface BlinkEditor {
    blink(from: Node | undefined, to: Node | undefined): void;
    nodesToBlink: Array<[top: Node, bottom: Node]>;
}

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor &
            ReactEditor &
            HistoryEditor &
            DefaultTextBlockEditor<ParagraphNode> &
            RichBlocksAwareEditor &
            SerializingEditor &
            BlinkEditor;
        Element: ElementNode;
        Text: TextNode;
    }
}
