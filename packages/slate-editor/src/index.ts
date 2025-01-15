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
