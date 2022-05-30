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
export type { RichBlocksAwareEditor } from './plugins';
export type { EditorRef, EditorProps } from './types';
export { useEditorEvents } from './useEditorEvents';
