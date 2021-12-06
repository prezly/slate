export { default } from './EditorV4';
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
export { default as useEditorEvents } from './useEditorEvents';
