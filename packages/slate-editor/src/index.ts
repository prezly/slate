import './types';

export * from '@prezly/slate-types';
export * from './components';
export * as Icons from './icons';
export * from './modules/editor';
export { EditableWithExtensions } from './modules/editable';

export { createCoverage } from './extensions/coverage';
export { createEmbed } from './extensions/embed';
export {
    type PlaceholdersExtensionParameters,
    createPlaceholder,
    PlaceholderNode,
} from './extensions/placeholders';
export { createContactNode, JobDescription } from './extensions/press-contacts';
export type { User } from './extensions/user-mentions';
export { type ResultPromise, type UploadcareOptions, withUploadcare } from './modules/uploadcare';
