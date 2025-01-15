export * from '@prezly/slate-types';
export * from './components';
export * as Icons from './icons';
export * from './modules/editor';
export { EditableWithExtensions } from './modules/editable';

export { createCoverage } from './extensions/coverage';
export { CustomNormalizationExtension } from './extensions/custom-normalization';
export { createEmbed } from './extensions/embed';
export { createHeading, HeadingExtension } from './extensions/heading';
export { createImage } from './extensions/image';
export { createParagraph, ParagraphsExtension } from './extensions/paragraphs';
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

import type { ElementNode, TextNode } from '@prezly/slate-types';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';

import type { FlashEditor } from '#extensions/flash-nodes';
import type { ElementsEqualityCheckEditor } from '#modules/editor';

type Editor = BaseEditor & HistoryEditor & ElementsEqualityCheckEditor & FlashEditor;

declare module 'slate' {
    interface CustomTypes {
        Editor: Editor;
        Element: ElementNode;
        Text: TextNode;
    }
}
