import type { ElementNode, TextNode } from '@prezly/slate-types';
import type { BaseEditor } from 'slate';
import type { ReactEditor } from 'slate-react';
import type { HistoryEditor } from 'slate-history';

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: ElementNode;
        Text: TextNode;
    }
}

import * as EditorCommands from './commands';

export { default as EditableWithExtensions } from './EditableWithExtensions';

export { EditorCommands };
export {
    createDeserializeElement,
    createEmptyValue,
    decodeSlateFragment,
    encodeSlateFragment,
    isGoogleDocsWrapper,
    nodeIdManager,
    useSavedSelection,
} from './lib';
export * from './constants';
export * from './plugins';
export * from './types';
