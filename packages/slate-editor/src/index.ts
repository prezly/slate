export * from '@prezly/slate-types';
export * from './components';
export * as Icons from './icons';
export * from './modules/editor';
export { EditableWithExtensions } from './modules/editable';

export { createCoverage } from './extensions/coverage';
export { createEmbed } from './extensions/embed';
export { createHeading } from './extensions/heading';
export { createParagraph } from './extensions/paragraphs';
export {
    type PlaceholdersExtensionParameters,
    createPlaceholder,
    PlaceholderNode,
} from './extensions/placeholders';
export { createContactNode, JobDescription } from './extensions/press-contacts';
export type { User } from './extensions/user-mentions';
export type { Variable } from './extensions/variables';
export { type ResultPromise, type UploadcareOptions, withUploadcare } from './modules/uploadcare';

// Editor type

import type { ElementNode, ParagraphNode, TextNode } from '@prezly/slate-types';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

import type { FlashEditor } from '#extensions/flash-nodes';
import type {
    DefaultTextBlockEditor,
    ElementsEqualityCheckEditor,
    RichBlocksAwareEditor,
    SerializingEditor,
} from '#modules/editor';

type Editor = BaseEditor &
    ReactEditor &
    HistoryEditor &
    DefaultTextBlockEditor<ParagraphNode> &
    ElementsEqualityCheckEditor &
    RichBlocksAwareEditor &
    SerializingEditor &
    FlashEditor;

declare module 'slate' {
    interface CustomTypes {
        Editor: Editor;
        Element: ElementNode;
        Text: TextNode;
    }
}
