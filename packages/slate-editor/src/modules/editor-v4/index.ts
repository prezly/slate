export { default } from './EditorV4';
export {
    createDataTransfer,
    createEditorValueWithCoverageAsString,
    createEmptyEditorValueAsString,
    deserialize,
    isEditorValueEquivalent,
    serialize,
} from './lib';
export type { EditorRef, EditorV4Props } from './types';
export { default as useEditorEvents } from './useEditorEvents';
