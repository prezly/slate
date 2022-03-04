export { default as EditorV4 } from './EditorV4';
export { createEditorV4 } from './createEditorV4';
export {
    createDataTransfer,
    createEmptyValue,
    createEmptyEditorValueAsString,
    createEditorValueWithCoverageAsString,
    serialize,
    deserialize,
    isEditorValueEquivalent,
} from './lib';
export type { EditorRef, EditorV4Props } from './types';
export { useEditorEvents } from './useEditorEvents';
