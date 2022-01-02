import type { ElementNode, TextNode } from '@prezly/slate-types';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: ElementNode;
        Text: TextNode;
    }
}

import * as EditorCommands from './commands';

export { EditableWithExtensions } from './EditableWithExtensions';

export { EditorCommands };
export {
    createDeserializeElement,
    decodeSlateFragment,
    encodeSlateFragment,
    isGoogleDocsWrapper,
    nodeIdManager,
    useSavedSelection,
} from './lib';
export * from './constants';
export * from './plugins';
export * from './types';
