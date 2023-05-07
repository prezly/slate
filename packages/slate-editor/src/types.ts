import type { ElementNode, ParagraphNode, TextNode } from '@prezly/slate-types';
import type { BaseEditor } from 'slate';
import type { HistoryEditor } from 'slate-history';
import type { ReactEditor } from 'slate-react';

import type { FlashEditor } from '#extensions/flash-nodes';
import type {
    DefaultTextBlockEditor,
    ElementsEqualityCheckEditor,
    RichBlocksAwareEditor,
    SerializingEditor,
} from '#modules/editor';

export type Editor = BaseEditor &
    ReactEditor &
    HistoryEditor &
    DefaultTextBlockEditor<ParagraphNode> &
    ElementsEqualityCheckEditor &
    RichBlocksAwareEditor &
    SerializingEditor &
    FlashEditor;

declare module 'slate' {
    interface CustomTypes {
        Editor: Editor;
        Element: ElementNode;
        Text: TextNode;
    }
}
