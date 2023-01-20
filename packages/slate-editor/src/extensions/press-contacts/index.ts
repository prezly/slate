export { PressContactsExtension, EXTENSION_ID } from './PressContactsExtension';

export { JobDescription, FloatingPressContactsMenu, PressContactElement } from './components';
export {
    createContactNode,
    normalizeContactInfoAttributes,
    normalizeContactNodeAttributes,
    parseSerializedElement,
    removePressContact,
    useFloatingPressContactsMenu,
} from './lib';
export type { PressContactsExtensionParameters, SearchProps } from './types';
