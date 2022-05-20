export { default as Editor } from './Editor';
export { createEditor } from './createEditor';
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
